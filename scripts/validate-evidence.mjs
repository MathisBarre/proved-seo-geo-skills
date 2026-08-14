import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = resolve(
  repositoryRoot,
  "skills/proved-seo-geo/references/source-registry.json",
);
const referencesRoot = resolve(repositoryRoot, "skills/proved-seo-geo/references");
const tiers = new Set([
  "primary",
  "secondary observation",
  "reference skill",
]);

const errors = [];
const fail = (message) => errors.push(message);

function listMarkdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(path);
    return extname(entry.name) === ".md" ? [path] : [];
  });
}

let registry;
try {
  registry = JSON.parse(readFileSync(registryPath, "utf8"));
} catch (error) {
  fail(`Cannot parse source registry: ${error.message}`);
}

if (registry) {
  if (registry.schemaVersion !== 1) fail("source registry must use schemaVersion 1");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(registry.lastReviewed ?? "")) {
    fail("source registry lastReviewed must be an ISO date");
  }
  if (!Array.isArray(registry.allowedHosts) || registry.allowedHosts.length === 0) {
    fail("source registry needs a non-empty allowedHosts list");
  }
  if (!Array.isArray(registry.sources) || registry.sources.length === 0) {
    fail("source registry needs at least one source");
  }

  const ids = new Set();
  const hosts = new Set(registry.allowedHosts ?? []);
  for (const source of registry.sources ?? []) {
    const prefix = `source ${source.id ?? "<missing id>"}`;
    if (!/^[A-Z][A-Z0-9-]+$/.test(source.id ?? "")) {
      fail(`${prefix}: id must be uppercase letters, digits, and hyphens`);
    }
    if (ids.has(source.id)) fail(`${prefix}: duplicate id`);
    ids.add(source.id);
    if (!tiers.has(source.tier)) fail(`${prefix}: unsupported tier ${source.tier}`);
    for (const field of ["publisher", "title", "scope", "limitations", "reviewCadence"]) {
      if (typeof source[field] !== "string" || source[field].trim() === "") {
        fail(`${prefix}: ${field} must be a non-empty string`);
      }
    }
    if (source.tier === "secondary observation" && typeof source.method !== "string") {
      fail(`${prefix}: a secondary observation needs a method`);
    }
    try {
      const url = new URL(source.url);
      if (url.protocol !== "https:") fail(`${prefix}: URL must use HTTPS`);
      if (!hosts.has(url.hostname)) fail(`${prefix}: host ${url.hostname} is not allowlisted`);
    } catch {
      fail(`${prefix}: invalid URL`);
    }
  }

  for (const markdownPath of listMarkdownFiles(referencesRoot)) {
    const text = readFileSync(markdownPath, "utf8");
    const relative = markdownPath.slice(repositoryRoot.length + 1);
    const matches = text.matchAll(/\[([A-Z]+-[A-Z0-9-]+|INDEXNOW)\]/g);
    for (const [, id] of matches) {
      if (!ids.has(id)) fail(`${relative}: references unknown source ID ${id}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Evidence validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Evidence registry and references are valid.");
}
