<p align="center">
  <img src="assets/banner.png" alt="Skill Router" width="860">
</p>

<h1 align="center">Skill Router</h1>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
  <a href="https://clawhub.ai"><img src="https://img.shields.io/badge/OpenClaw-plugin-6d5efc?style=for-the-badge" alt="OpenClaw plugin"></a>
  <a href="https://github.com/pmuhammadagus-byte/openclaw-skill-router/commits/main"><img src="https://img.shields.io/badge/status-pending%20publish-orange?style=for-the-badge" alt="Status"></a>
</p>

Skill Router is an **OpenClaw plugin that routes any task to the best skill in YOUR catalog** — automatically. Give it a task description; it returns the top matching skills with reasons and ClawHub links. No more guessing which of your dozens of skills fits.

<p align="center">
  <a href="https://clawhub.ai">ClawHub</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#usage">Usage</a> ·
  <a href="CONTRIBUTING.md">Contributing</a> ·
  <a href="LICENSE">License</a>
</p>

## What it does

- 🎯 **Auto-routing** — natural-language task → ranked skill recommendations.
- 🗂️ **Built for large catalogs** — when you have dozens of skills, the model doesn't always know which fits.
- 🔗 Every recommendation ships a **ClawHub link** for one-tap open/install.
- ⚡ **Local & private** — no network calls, no external APIs. Fast and safe.
- 🍴 **Fork-friendly** — drop in your own `skills.json` and the router serves *your* catalog.

## How it works (high level)

- The plugin reads `skills.json` on load (a snapshot of your catalog: name, slug, description).
- When `skill_router` is called, it tokenizes the task, scores each skill by keyword overlap + phrase match in the description, and returns the top-N ranked results with links.
- Everything runs locally inside the OpenClaw gateway.

## Installation

```bash
# from ClawHub (after public publish)
openclaw plugins install clawhub:<owner>/openclaw-skill-router

# or from a local path
openclaw plugins install /path/to/skill-router --force
```

Then restart the gateway:

```bash
openclaw gateway restart
```

Verify it loaded:

```bash
openclaw plugins inspect skill-router --json
```

## Usage

The plugin registers one tool: **`skill_router`**.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `task` | string | ✅ | Description of what you want to accomplish |
| `limit` | number | ❌ | How many recommendations (1–10, default 3) |

### Example

> **You:** "Scrape data from the web then summarize it into a PDF"
>
> **Model** (via `skill_router`) returns:
>
> ```
> Top 3 skill(s) for: "scrape web then summarize into PDF"
>
> 1. web-scraper (score 17) — extract from sites
>    https://clawhub.ai/<owner>/web-scraper
> 2. pdf-summarizer (score 13) — concise summary
>    https://clawhub.ai/<owner>/pdf-summarizer
> 3. doc-builder (score 9) — assemble to PDF
>    https://clawhub.ai/<owner>/doc-builder
>
> Total catalog size: 42 skills.
> ```

No strong match? It points you to an **orchestrator skill** (if present in your catalog) to combine several skills at once.

## Repo layout

- `src/index.ts` — TypeScript source reference.
- `dist/index.js` — built entry point (`registerTool: skill_router`).
- `openclaw.plugin.json` — plugin manifest (id, contracts, activation).
- `package.json` — metadata + `openclaw` extension config.
- `skills.json` — your catalog snapshot consumed at runtime.
- `assets/banner.svg` + `assets/banner.png` — README hero.
- `CONTRIBUTING.md` — how to fork, develop, and refresh the catalog.
- `LICENSE` — MIT.

## Local dev

Prereqs: Node 22.22+/24.15+ and an OpenClaw gateway.

```bash
# clone your fork
git clone https://github.com/<you>/openclaw-skill-router
cd openclaw-skill-router

# install into your OpenClaw (local path)
openclaw plugins install . --force
openclaw gateway restart

# confirm it loads
openclaw plugins inspect skill-router --json
```

Refresh `skills.json` for your own fork — see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Notes

- The tool is **optional by default** — the model only uses it if you enable it in `tools.allow`.
- Plugins **don't go through SkillSpector** (that's for skills), so there's no security flag.
- Requires OpenClaw `>=2026.3.24-beta.2`.
- Replace `<owner>` in examples with your ClawHub handle.

## License

[MIT](LICENSE) — free to use and modify.

---

<div align="center">

Made with Clara ✨ · OpenClaw plugin · generic & reusable

</div>
