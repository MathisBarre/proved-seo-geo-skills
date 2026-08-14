import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillRoot = resolve(repositoryRoot, "skills/proved-seo-geo");
const skillPath = resolve(skillRoot, "SKILL.md");
const errors = [];

if (!existsSync(skillPath)) {
  errors.push("skills/proved-seo-geo/SKILL.md is missing");
} else {
  const text = readFileSync(skillPath, "utf8");
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    errors.push("SKILL.md needs YAML frontmatter");
  } else {
    const fields = Object.fromEntries(
      frontmatter[1]
        .split("\n")
        .filter((line) => line.includes(":"))
        .map((line) => {
          const index = line.indexOf(":");
          return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
        }),
    );
    if (fields.name !== "proved-seo-geo") errors.push("SKILL.md frontmatter name must be proved-seo-geo");
    if (!fields.description || fields.description.length < 80) {
      errors.push("SKILL.md frontmatter needs a specific, substantial description");
    }
  }
  if (text.split("\n").length > 500) errors.push("SKILL.md must remain under 500 lines");

  for (const [, target] of text.matchAll(/\]\((references\/[^)#]+)(?:#[^)]*)?\)/g)) {
    if (!existsSync(resolve(skillRoot, target))) {
      errors.push(`SKILL.md links to a missing bundled reference: ${target}`);
    }
  }
}

const interfacePath = resolve(skillRoot, "agents/openai.yaml");
if (!existsSync(interfacePath)) {
  errors.push("skills/proved-seo-geo/agents/openai.yaml is missing");
} else {
  const interfaceText = readFileSync(interfacePath, "utf8");
  for (const field of ["display_name:", "short_description:", "default_prompt:"]) {
    if (!interfaceText.includes(field)) errors.push(`openai.yaml is missing ${field}`);
  }
}

if (errors.length > 0) {
  console.error("Skill validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Skill package is valid.");
}
