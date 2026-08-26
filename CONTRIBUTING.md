# 🤝 Contributing to Skill Router

Thanks for your interest in improving Skill Router! This is a small, focused
OpenClaw plugin — contributions are welcome.

## Ways to contribute

- 🐛 **Bug reports** — open an issue with steps to reproduce.
- 💡 **Feature ideas** — open an issue to discuss before coding.
- 🔧 **Pull requests** — fork, branch, and open a PR against `master`.

## Local development

```bash
# clone your fork
git clone https://github.com/<you>/openclaw-skill-router
cd openclaw-skill-router

# install into your OpenClaw (local path)
openclaw plugins install . --force
openclaw gateway restart

# verify it loads
openclaw plugins inspect skill-router --json
```

## Updating the skill catalog

`skills.json` is a snapshot of your catalog. To refresh it for your own fork:

```bash
# generate from your workspace SKILL.md files
node -e '
const fs=require("fs"),path=require("path");
const ws=process.env.WORKSPACE||"../skills";
const out=[];
for(const d of fs.readdirSync(ws)){
  const sm=path.join(ws,d,"SKILL.md");
  if(!fs.existsSync(sm))continue;
  const t=fs.readFileSync(sm,"utf8");
  const m=t.match(/^---\s*\n([\s\S]*?)\n---/);
  let name=d,desc="";
  if(m){const fm=m[1];
    name=(fm.match(/^name:\s*(.+)$/m)||[])[1]||name;
    desc=(fm.match(/^description:\s*(.+)$/m)||[])[1]||"";
  }
  out.push({folder:d,name:name.trim(),slug:d,description:desc.trim().slice(0,240)});
}
fs.writeFileSync("skills.json",JSON.stringify(out,null,1));
console.log("wrote",out.length,"skills");
'
```

Then commit and push.

## Code style

- Plain ESM JavaScript in `dist/index.js` (no build step required).
- Keep `skills.json` generation reproducible.
- Run `openclaw plugins inspect skill-router --json` before opening a PR.

## Publishing

Maintainers publish via:

```bash
clawhub package publish pmuhammadagus-byte/openclaw-skill-router
```

---

Made with Clara ✨
