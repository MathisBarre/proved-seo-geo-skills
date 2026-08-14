# Technical SEO: Google and Bing

Use this reference for implementation work. Source IDs resolve in [source-registry.json](source-registry.json).

## Discovery and sitemaps

- Link important URLs with normal crawlable `<a href>` links from relevant pages. Google describes this as the discoverable link form; Bing also asks for crawlable internal links. `[G-CRAWLABLE-LINKS] [B-GUIDELINES]`
- Include the canonical URLs you want discovered in XML sitemaps. Use absolute URLs; keep Bing `lastmod` truthful and remove stale redirected/deleted URLs. A sitemap assists discovery, not guaranteed crawl or indexation. `[G-SITEMAPS] [B-SITEMAPS]`
- Submit a genuine add, update, or delete through IndexNow when it serves Bing discovery. A successful receipt is not proof of indexing. `[INDEXNOW]`

**Verify:** inspect live HTML links, sitemap URLs, server status, and Google Search Console / Bing Webmaster Tools. Treat a sitemap as an input, not an outcome.

## Robots and indexing controls

- Use `robots.txt` to manage crawling, not as the only way to remove an indexed URL. Use `noindex` or access control when the objective is exclusion from search; do not block the crawler from reading a `noindex` it must see. `[G-ROBOTS] [B-ROBOTS] [B-META-ROBOTS]`
- A Google page needs to be indexed and snippet-eligible before it can be eligible as a supporting link in Google AI features. Bing documents that `noindex` excludes a page from Bing and its Copilot/grounding use. `[G-AI-FEATURES] [B-META-ROBOTS]`

**Verify:** inspect response headers/meta robots, fetch accessibility, and indexed-page reports after a reasonable recrawl window.

## Canonical URLs and rendering

- Choose one public URL per principal piece of content and align internal links, redirects, canonical annotations, and sitemaps. Google treats redirects and canonicals as strong signals but makes the final canonical decision; Bing recommends consolidating duplicates and using permanent redirects for permanent moves. `[G-CANONICALS] [B-GUIDELINES]`
- Give each durable public destination in a JavaScript application its own stable URL. Choose an explicit canonical/indexability policy for transient, personalized, or parameterized states rather than generating an indexable URL for every state. Make essential content and crawlable links available in the rendered HTML; do not require a visitor action solely to reveal critical facts. The URL-state policy is an implementation inference; Google and Bing document the underlying rendering and canonicalization constraints. `[G-JS] [G-CANONICALS] [B-GUIDELINES]`

**Verify:** compare initial and rendered HTML, inspect individual URLs, test a non-JavaScript/limited-JavaScript path where appropriate, and use engine URL inspection tools.

## Titles, headings, snippets, and structured data

- Give each page a concise, descriptive, distinct `<title>` and use a clear visible page heading and logical hierarchy. Google may compose title links from more than the title element; Bing asks for semantic, logical heading structure. `[G-TITLES] [B-GUIDELINES]`
- Write a specific meta description when it best describes the page; Google may instead extract a snippet from visible content. There is no official fixed length target. `[G-SNIPPETS]`
- Add structured data only when it accurately represents visible page content and the relevant documented feature. It can enable rich-result eligibility or improve understanding, not a general ranking/citation guarantee. `[G-STRUCTURED] [B-GUIDELINES]`

**Verify:** inspect the page's visible text, validate eligible structured data, and review actual search appearance without treating it as a promised result.

## Images, video, and interactive content

- Use standard image markup and descriptive alternative text; Google documents `<img src>` as its image-discovery path rather than CSS background images. `[G-IMAGES]`
- Give video a discoverable public watch page or normal embed, and make the key information available without requiring an interaction to load it. Pair it with visible explanatory facts; use captions or a transcript when they serve viewers, as an editorial/accessibility choice rather than a claimed Google ranking requirement. `[G-VIDEO] [B-GUIDELINES]`
- Treat a mini-app, calculator, or demo as a visitor experience. Pair it with stable URLs and explanatory facts in public rendered text if those facts matter to discovery or evaluation. This is an implementation inference from rendering guidance, not a claim that interactivity improves rank or citation. `[G-JS] [B-GUIDELINES]`

**Verify:** inspect rendered media markup, test load paths, and confirm that essential facts remain understandable without the interactive layer.

## Releases and real freshness

Publish a stable release URL with the version, what changed, who is affected, limitations, and an honest publication/modified date. Keep structured dates aligned with visible dates when used. Do not change dates or create pages merely to simulate freshness. `[G-DATES] [G-HELPFUL] [B-SITEMAPS] [INDEXNOW]`
