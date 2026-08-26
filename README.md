# 🧭 Skill Router — Plugin OpenClaw

> **"Lo punya 59 skill di ClawHub… tapi tiap kali ngerjain sesuatu, skill mana yang harus dipakai?"**

Skill Router menjawab itu. Kasih dia deskripsi tugas, dia balikin **skill terbaik dari katalog lo** lengkap dengan alasan + link ClawHub. Gak perlu ingat nama skill satu-satu.

---

## ✨ Kenapa ini berguna

- 🗂️ Katalog lo tebal (59+ skill: `super-intelligence`, `skill-os`, `agent-hierarchy-100`, `aurum-brain`, dll). Model gak selalu tau mana yang pas.
- 🎯 **Routing otomatis** — dari tugas natural language → rekomendasi skill ranked by relevance.
- 🔗 Tiap rekomendasi langsung kasih **link ClawHub** biar gampang dibuka/di-install.
- ⚡ Jalan di dalam OpenClaw sebagai agent tool — model bisa panggil sendiri pas butuh.

---

## 📦 Instalasi

```bash
# dari ClawHub (setelah publish public)
openclaw plugins install clawhub:pmuhammadagus-byte/openclaw-skill-router

# atau dari lokal (path folder plugin)
openclaw plugins install /path/ke/skill-router --force
```

Lalu restart gateway biar plugin ke-load:

```bash
openclaw gateway restart
```

Cek status:

```bash
openclaw plugins inspect skill-router --json
```

---

## 🛠️ Cara pakai

Plugin mendaftarkan satu tool: **`skill_router`**.

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `task` | string | ✅ | Deskripsi tugas yang mau lo kerjain |
| `limit` | number | ❌ | Berapa rekomendasi (1–10, default 3) |

### Contoh pemanggilan (dari dalam chat OpenClaw)

> **Lo:** "Aku mau bikin sistem subagent berlapis buat manajerin tim agent"
>
> **Model** (lewat `skill_router`) balikin:
>
> ```
> Top 3 skill(s) for: "buat sistem subagent berlapis"
>
> 1. Agent Hierarchy 100 (agent-hierarchy-100) — score 18
>    A system for designing and managing multi-level subagent hierarchies...
>    https://clawhub.ai/pmuhammadagus-byte/agent-hierarchy-100
>
> 2. Skill OS (skill-os) — score 12
>    The master orchestrator for the OpenClaw Skill OS ecosystem...
>    https://clawhub.ai/pmuhammadagus-byte/skill-os
>
> 3. Subagent-Driven Development (subagent-driven-development) — score 9
>    ...
>    https://clawhub.ai/pmuhammadagus-byte/subagent-driven-development
>
> Total catalog size: 59 skills.
> ```

Gak ada match kuat? Dia arahin lo ke **Skill OS orchestrator** buat gabungin beberapa skill sekaligus.

---

## 🧩 Gimana ini kerja (simpel)

1. Saat plugin load, dia baca `skills.json` — snapshot 59 skill lo (nama, slug, deskripsi).
2. Pas `skill_router` dipanggil, dia tokenize tugas lo, score tiap skill by overlap kata kunci + phrase match di deskripsi.
3. Return top-N ranked + link.

Gak ada network call, gak ada API eksternal — **semua lokal**, cepat & privasi aman.

---

## 📁 Struktur repo

```
skill-router/
├── package.json          # metadata + peerDep openclaw
├── openclaw.plugin.json  # manifest plugin (id, contracts, activation)
├── skills.json           # snapshot katalog skill lo (59 item)
├── dist/
│   └── index.js          # entry point (registerTool: skill_router)
└── src/
    └── index.ts          # source TypeScript (referensi)
```

---

## 🔄 Update katalog

`skills.json` di-generate dari workspace lo. Kalau nambah skill baru, regenerate:

```bash
node -e "/* lihat src untuk generator */"
```

Lalu commit + push, lalu re-publish ke ClawHub.

---

## ⚠️ Catatan

- Tool ini **optional** secara default — model cuma pakai kalau lo enable di `tools.allow` (atau izinin plugin-nya).
- Plugin **gak lewat SkillSpector** (itu khusus skill), jadi gak kena flag keamanan kayak skill.
- Butuh OpenClaw `>=2026.3.24-beta.2`.

---

## 📜 Lisensi

Milik `pmuhammadagus-byte` · bebas dipakai & dimodif buat kebutuhan lo.

---

_Dibuat sama Clara ✨ buat Bos Agus · 2026-08-27_
