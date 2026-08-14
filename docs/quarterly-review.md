# Quarterly review

The project reviews its sources once each calendar quarter. “Review” means checking the current source corpus and opening a traceable proposal; it does not mean changing text merely to look fresh.

## Review output

Each cycle creates or updates a record under `reviews/watch/<year>-Q<quarter>.*` and opens a **draft pull request** when that record differs from `main`. The record reports:

- which allowlisted URLs were checked;
- response status and safe change indicators such as `ETag` or `Last-Modified` when available;
- which reference-skill files moved;
- candidate primary or secondary sources found by the research step;
- any proposed claim additions, changes, exclusions, or no-change conclusion.

## Required human judgement

An automated record is not an evidence review. A maintainer must decide whether a changed source changes a claim, whether a source is still authoritative, and whether a new secondary domain belongs in the allowlist. The reviewer must keep scope, limitations, and measurement separate.

## Cadence and resilience

The GitHub Action is scheduled on the third day of January, April, July, and October. Scheduled GitHub workflows can be delayed and public-repository schedules can be disabled after inactivity, so the accompanying Codex task checks the current cycle and prepares a candidate report. Either mechanism can be run manually.

No automation may merge a pull request or change protected files.
