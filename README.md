# Proved SEO & GEO

An evidence-led agent skill for Google Search and Bing. It helps plan, write, and review technical SEO and content work without pretending that ranking or AI citation has a secret formula.

It covers two connected disciplines:

- **Technical SEO:** discovery, crawlability, indexing controls, sitemaps, canonicals, JavaScript, structured data, images, video, and release publishing.
- **Content and editorial experience:** landing pages, product pages, articles, release notes, original research, video, images, and interactive tools.

GEO is treated as part of those fundamentals: make useful information public, clear, crawlable, indexable, and eligible for the surfaces that may show it. It is not a promise of an AI Overview, AI Mode, Copilot grounding result, citation, click, or conversion.

## Install

After this repository is published, install the bundled skill from its `skills/` directory with your usual Skills CLI workflow. For example:

```bash
npx skills add MathisBarre/proved-seo-geo-skills --skill proved-seo-geo
```

## What makes a recommendation admissible

Every recommendation must point to an entry in the [canonical source registry](skills/proved-seo-geo/references/source-registry.json) and say what kind of evidence supports it:

- **Primary** — an official Google, Bing, or IndexNow publication.
- **Secondary observation** — a documented study; useful for a hypothesis, not a universal rule.
- **Experiment** — a scoped test with a method, context, and result.
- **Heuristic** — a clearly marked local decision that still needs validation.

The skill deliberately rejects precise but unsupported rules such as a required word count, a fixed number of headings, keyword density, an `llms.txt` requirement, or a special schema format for AI citations.

Read the [philosophy](docs/philosophy.md), [scope and non-goals](docs/scope-and-non-goals.md), and [evidence policy](docs/governance.md) before contributing a new claim.

## Maintenance

The source register is reviewed at least once per calendar quarter. The planned automation opens a **draft pull request** containing a source-watch record; it never merges, rewrites recommendations, or promotes a new secondary source without review.

Details and the human/agent review rubric live in [quarterly review](docs/quarterly-review.md) and [agent maintenance](docs/agent-maintenance.md).

To activate the remote workflow safely after publication, follow [publishing and automation setup](docs/publishing-and-automation.md).

## Repository layout

```text
skills/proved-seo-geo/    Installable skill and its canonical references
docs/                     Philosophy, governance, and contribution rules
reviews/                  Versioned quarterly review records
scripts/                  Offline validators and allowlisted source watcher
.github/                  Validation and draft-PR automation
```

The documentation site / GitHub Pages experiment is intentionally deferred; see [the roadmap](docs/roadmap.md).

## License

[MIT](LICENSE).
