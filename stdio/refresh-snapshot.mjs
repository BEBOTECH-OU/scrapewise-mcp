// Refresh the bundled offline snapshot from the public catalog (no key needed).
//   node stdio/refresh-snapshot.mjs [catalog-url]
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const url = process.argv[2] || "https://mcp.scrapewise.ai/.well-known/mcp/tools.json";
const res = await fetch(url, { headers: { accept: "application/json" } });
if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
const body = await res.json();
if (!Array.isArray(body?.tools) || body.tools.length === 0) throw new Error(`${url}: no tools`);
const out = join(dirname(fileURLToPath(import.meta.url)), "tools.snapshot.json");
writeFileSync(out, JSON.stringify({ tools: body.tools }, null, 1) + "\n");
console.log(`wrote ${body.tools.length} tools from ${url} to ${out}`);
