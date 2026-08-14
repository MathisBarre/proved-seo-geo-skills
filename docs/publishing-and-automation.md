# Publishing and automation setup

The repository is designed to work without secrets for validation and source-header monitoring. Publishing it and enabling automatic draft PRs needs these one-time maintainer actions after the initial push.

1. Create the GitHub repository and push `main`.
2. In repository Actions settings, allow workflows to use the `GITHUB_TOKEN` with read/write repository contents and pull-request permissions. Do not grant the workflow permission to approve or merge pull requests.
3. Protect `main`: require a pull request and review; enable CODEOWNERS review for protected paths. The checked-in `CODEOWNERS` assigns this role to `@MathisBarre`; update it if stewardship changes.
4. Run **Quarterly source watch** manually once to verify that it creates a draft PR containing only `reviews/watch/` files.
5. Keep the Codex quarterly automation active. It is the research/candidate-review layer; GitHub Actions is the reliable remote source-watch layer.

## Secrets

The checked-in workflows use no OpenAI secret and do not execute remote code. If a later workflow uses a model to assess a normalized source snapshot, give that job a dedicated, scoped secret and keep it separate from the GitHub-writing job. Never place a token in a repository file, issue, or source registry.

## Why there are two layers

The GitHub Action checks only known URLs and produces a bounded review record. It is intentionally unable to alter advice. The Codex task looks for meaningful primary changes and new secondary candidates, then asks for human judgement in a draft PR. Both preserve reviewability; neither auto-merges.
