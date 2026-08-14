import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = resolve(
  repositoryRoot,
  "skills/proved-seo-geo/references/source-registry.json",
);
const validateOnly = process.argv.includes("--validate");
const registry = JSON.parse(readFileSync(registryPath, "utf8"));
const allowedHosts = new Set(registry.allowedHosts);

function currentQuarter(date = new Date()) {
  return `${date.getUTCFullYear()}-Q${Math.floor(date.getUTCMonth() / 3) + 1}`;
}

function assertSafeSource(source) {
  const url = new URL(source.url);
  if (url.protocol !== "https:" || !allowedHosts.has(url.hostname)) {
    throw new Error(`Unsafe or unallowlisted source URL for ${source.id}`);
  }
}

function header(response, name) {
  const value = response.headers.get(name);
  return value ? value.slice(0, 512) : null;
}

async function requestHeaders(url, method) {
  const response = await fetch(url, {
    method,
    redirect: "manual",
    signal: AbortSignal.timeout(20_000),
    headers: {
      "user-agent": "proved-seo-geo-source-watch/0.1 (+https://github.com/)",
      ...(method === "GET" ? { range: "bytes=0-0" } : {}),
    },
  });
  if (method === "GET" && response.body) await response.body.cancel();
  return response;
}

async function observe(source) {
  try {
    assertSafeSource(source);
    let response = await requestHeaders(source.url, "HEAD");
    if ([405, 501].includes(response.status)) response = await requestHeaders(source.url, "GET");
    return {
      id: source.id,
      tier: source.tier,
      url: source.url,
      status: response.status,
      etag: header(response, "etag"),
      lastModified: header(response, "last-modified"),
      contentType: header(response, "content-type"),
      cacheControl: header(response, "cache-control"),
      redirected: response.status >= 300 && response.status < 400,
    };
  } catch (error) {
    return {
      id: source.id,
      tier: source.tier,
      url: source.url,
      status: "error",
      error: error instanceof Error ? error.message.slice(0, 512) : String(error).slice(0, 512),
    };
  }
}

function renderMarkdown(report) {
  const lines = [
    `# Source watch — ${report.reviewWindow}`,
    "",
    "This record is an allowlisted header/status check. It does not interpret remote page content or change recommendations.",
    "",
    "| Source | Tier | Status | ETag | Last-Modified |",
    "| --- | --- | --- | --- | --- |",
  ];
  for (const item of report.observations) {
    const status = item.status === "error" ? `error: ${item.error}` : String(item.status);
    lines.push(
      `| ${item.id} | ${item.tier} | ${status.replaceAll("|", "\\|")} | ${(item.etag ?? "—").replaceAll("|", "\\|")} | ${(item.lastModified ?? "—").replaceAll("|", "\\|")} |`,
    );
  }
  lines.push("", "A maintainer must review changed primary sources and any candidate source before changing the skill.", "");
  return lines.join("\n");
}

for (const source of registry.sources) assertSafeSource(source);
if (validateOnly) {
  console.log(`Validated ${registry.sources.length} allowlisted sources. No network request or file write was performed.`);
  process.exit(0);
}

const observations = await Promise.all(registry.sources.map(observe));
const report = {
  schemaVersion: 1,
  reviewWindow: currentQuarter(),
  registryLastReviewed: registry.lastReviewed,
  observationMethod: "HEAD request; bounded GET fallback only when HEAD is unsupported; redirects are not followed.",
  observations,
};
const watchDirectory = resolve(repositoryRoot, "reviews/watch");
mkdirSync(watchDirectory, { recursive: true });
const stem = resolve(watchDirectory, report.reviewWindow);
writeFileSync(`${stem}.json`, `${JSON.stringify(report, null, 2)}\n`);
writeFileSync(`${stem}.md`, renderMarkdown(report));
console.log(`Wrote ${report.reviewWindow} source-watch records for ${observations.length} sources.`);
