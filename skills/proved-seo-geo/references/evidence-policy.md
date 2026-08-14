# Evidence policy

This file governs every claim made by `proved-seo-geo`. The canonical source list is [source-registry.json](source-registry.json).

## Evidence labels

| Label | Use when | Required wording |
| --- | --- | --- |
| `primary` | Google, Bing, or IndexNow documents the point | “Google/Bing documents…” or “This is an eligibility/implementation requirement…” |
| `secondary observation` | A study reports a method and bounded result | “This study observed…; test it in this context.” |
| `experiment` | A local test records intervention and outcome | “In this test/context…” |
| `heuristic` | A reversible local decision has no sufficient evidence | “Use as a working choice; validate it.” |

## Claim record

Every non-trivial recommendation needs:

```text
Claim:
Source IDs:
Source locator (section, heading, table, or other stable pointer):
Source checked on:
Evidence label:
Scope and preconditions:
Limitations / counterevidence:
Verification method:
```

## Source precedence

1. Primary Google/Bing documentation governs claims about those engines.
2. A primary source may establish a technical condition without establishing a ranking effect.
3. Secondary research can suggest a measurement or content hypothesis only when its method and limitations are disclosed.
4. A local experiment never becomes a global rule without separately applicable evidence.

## Exclusions

Do not state or imply that the following are general ranking/citation factors: a prescribed number of words, H1s, H2s, paragraphs, images, videos, FAQs, tables, schema properties, keyword repetitions, publication frequency, `llms.txt`, or a special “AI schema.”

Do not claim that a sitemap, IndexNow, schema, a date change, an embed, or a citation guarantees indexing, ranking, grounding, traffic, or conversion. Do not turn a correlation or a dashboard report into a causal explanation.

## Review a secondary source before using it

Record the publisher/author, publication date, population or sample, collection method, comparison group, metrics, incentives, geographic and engine scope, and major confounders. If these are unavailable, keep it out of actionable guidance.

The registry is a curated index, not sufficient evidence on its own. Retrieve the original secondary source (or a reviewed, versioned local snapshot) before quoting it. If its method, scope, or limitations cannot be checked, label it a candidate and do not use it to support a user-facing recommendation.
