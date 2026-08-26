<div align="center">

# 🧭 Skill Router

**Route any task to the best skill in YOUR catalog — automatically.**

[![OpenClaw](https://img.shields.io/badge/OpenClaw-plugin-6d5efc)](https://clawhub.ai)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/status-pending%20publish-orange)](https://clawhub.ai)
[![Made with Clara](https://img.shields.io/badge/made%20with-Clara-ff69b4)](https://github.com/pmuhammadagus-byte)

![Skill Router banner](assets/banner.png)

</div>

---

> **"Lo punya banyak skill di ClawHub… tapi tiap kali ngerjain sesuatu, skill mana yang harus dipakai?"**
>
> Skill Router menjawab itu. Kasih dia deskripsi tugas, dia balikin **skill terbaik dari katalog lo** lengkap dengan alasan + link ClawHub. Gak perlu ingat nama skill satu-satu.

## ✨ Why this is useful

- 🎯 **Auto-routing** — dari tugas natural language → rekomendasi skill yang di-rank by relevansi.
- 🗂️ **Cocok buat katalog skill tebal** — kalau lo punya puluhan skill, model gak selalu tau mana yang pas.
- 🔗 Tiap rekomendasi langsung kasih **link ClawHub** biar gampang dibuka/di-install.
- ⚡ **Lokal & privat** — gak ada network call, gak ada API eksternal. Cepat & aman.
- 🍴 **Fork-friendly** — plug-in `skills.json` lo sendiri, router langsung nyambung ke katalog lo.

## 📦 Installation

```bash
# dari ClawHub (setelah publish public)
openclaw plugins install clawhub:<owner>/openclaw-skill-router

# atau dari lokal (path folder plugin)
openclaw plugins install /path/ke/skill-router --force
```

Restart gateway biar plugin ke-load:

```bash
openclaw gateway restart
```

Verifikasi:

```bash
openclaw plugins inspect skill-router --json
```

## 🛠️ Usage

Plugin mendaftarkan satu tool: **`skill_router`**.

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `task` | string | ✅ | Deskripsi tugas yang mau lo kerjain |
| `limit` | number | ❌ | Berapa rekomendasi (1–10, default 3) |

### Contoh

> **Lo:** "Aku mau nge-scrape data dari web terus rangkum jadi PDF"
>
> **Model** (lewat `skill_router`) balikin:
>
> ```
> Top 3 skill(s) for: "scrape web lalu rangkum jadi PDF"
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

Gak ada match kuat? Dia arahin lo ke **orchestrator skill** (kalau ada di katalog) buat gabungin beberapa skill sekaligus.

## 🧩 How it works

1. Saat plugin load, dia baca `skills.json` — snapshot katalog skill lo (nama, slug, deskripsi).
2. Pas `skill_router` dipanggil, dia tokenize tugas lo, score tiap skill by overlap kata kunci + phrase match di deskripsi.
3. Return top-N ranked + link.

Semua lokal. Gak ada network call.

## 📁 Repository structure

```
skill-router/
├── LICENSE                 # MIT
├── CONTRIBUTING.md         # panduan kontribusi
├── README.md               # dokumentasi ini
├── package.json            # metadata + peerDep openclaw
├── openclaw.plugin.json    # manifest plugin (id, contracts, activation)
├── skills.json             # snapshot katalog skill lo
├── assets/
│   ├── banner.svg          # sumber banner
│   └── banner.png          # banner (rendered)
├── dist/
│   └── index.js            # entry point (registerTool: skill_router)
└── src/
    └── index.ts            # source TypeScript (referensi)
```

## 🔄 Updating the catalog

`skills.json` di-generate dari workspace lo. Lihat [`CONTRIBUTING.md`](CONTRIBUTING.md) untuk skrip generator.

## 🍴 Fork this repo

Repo ini **publik & bebas di-fork**. Tujuannya: biar orang lain bisa lihat, fork, dan pakai router ini buat **katalog skill mereka sendiri**.

- 🔌 **Plug-and-play** — ganti `skills.json`, router langsung nyambung ke katalog kamu.
- 🧩 **Generic** — gak ngunci ke skill tertentu; cuma mesin routing lokal.
- 📚 **Belajar** — contoh nyata plugin OpenClaw dengan `registerTool` + manifest.
- ⭐ Star kalau berguna, fork kalau mau modif.

## ⚠️ Notes

- Tool ini **optional** secara default — model cuma pakai kalau lo enable di `tools.allow`.
- Plugin **gak lewat SkillSpector** (itu khusus skill), jadi gak kena flag keamanan.
- Butuh OpenClaw `>=2026.3.24-beta.2`.
- Ganti `<owner>` di contoh dengan handle ClawHub lo.

## 📜 License

[MIT](LICENSE) — bebas dipakai & dimodif.

---

<div align="center">

Made with Clara ✨ · OpenClaw plugin · generic & reusable

</div>
