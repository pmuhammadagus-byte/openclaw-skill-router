import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Type } from "typebox";
import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Skill catalog embedded from the pmuhammadagus-byte workspace.
// regenerated with: node -e "..." (see package notes)
let CATALOG: Array<{
  folder: string;
  name: string;
  slug: string;
  description: string;
}> = [];
try {
  const raw = readFileSync(join(__dirname, "..", "skills.json"), "utf8");
  CATALOG = JSON.parse(raw);
} catch {
  CATALOG = [];
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function scoreSkill(skill: (typeof CATALOG)[number], qTokens: string[], query: string): number {
  const hay = `${skill.name} ${skill.description} ${skill.slug}`.toLowerCase();
  let score = 0;
  const hayTokens = tokenize(hay);
  const haySet = new Set(hayTokens);
  for (const t of qTokens) {
    if (haySet.has(t)) score += 3;
    if (hay.includes(t)) score += 1;
  }
  // boost exact phrase hits in description
  if (skill.description.toLowerCase().includes(query.toLowerCase())) score += 5;
  return score;
}

export default definePluginEntry({
  id: "skill-router",
  name: "Skill Router",
  description:
    "Given a task description, recommends the best matching skill from the pmuhammadagus-byte catalog and explains why.",
  register(api) {
    api.registerTool({
      name: "skill_router",
      description:
        "Route a task to the best pmuhammadagus-byte skill. Input a task description; returns the top matching skills with reasons and ClawHub links.",
      parameters: Type.Object({
        task: Type.String({
          description:
            "Natural-language description of what the user wants to accomplish.",
        }),
        limit: Type.Optional(
          Type.Number({
            description: "How many recommendations to return (default 3, max 10).",
            minimum: 1,
            maximum: 10,
          }),
        ),
      }),
      async execute(_id, params) {
        const query = String(params.task || "");
        const limit = Math.min(Math.max(Number(params.limit) || 3, 1), 10);
        if (!query.trim()) {
          return {
            content: [
              {
                type: "text",
                text: "Provide a 'task' description to route to a skill.",
              },
            ],
          };
        }
        const qTokens = tokenize(query);
        const ranked = CATALOG.map((s) => ({
          skill: s,
          score: scoreSkill(s, qTokens, query),
        }))
          .filter((r) => r.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, limit);

        if (ranked.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No strong skill match for: "${query}".\nTry the Skill OS orchestrator (https://clawhub.ai/pmuhammadagus-byte/skill-os) to combine multiple skills.`,
              },
            ],
          };
        }

        const lines = ranked.map((r, i) => {
          const owner = "pmuhammadagus-byte";
          const link = `https://clawhub.ai/${owner}/${r.skill.slug}`;
          return `${i + 1}. ${r.skill.name} (${r.skill.slug}) — score ${r.score}\n   ${r.skill.description.slice(0, 160)}\n   ${link}`;
        });

        const text =
          `Top ${ranked.length} skill(s) for: "${query}"\n\n` +
          lines.join("\n\n") +
          `\n\nTotal catalog size: ${CATALOG.length} skills.`;

        return { content: [{ type: "text", text }] };
      },
    });
  },
});
