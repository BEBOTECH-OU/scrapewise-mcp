// Smoke test: start the stdio server WITHOUT a key and check initialize, tools/list and tools/call.
//   node stdio/smoke.mjs                  -> live public catalog
//   SMOKE_OFFLINE=1 node stdio/smoke.mjs  -> bundled snapshot only (catalog URL points nowhere)
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const here = dirname(fileURLToPath(import.meta.url));
const env = { ...process.env };
delete env.SCRAPEWISE_API_KEY;
if (process.env.SMOKE_OFFLINE === "1") env.SCRAPEWISE_CATALOG_URL = "http://127.0.0.1:9/none";

const client = new Client({ name: "smoke", version: "1" });
await client.connect(
  new StdioClientTransport({ command: process.execPath, args: [join(here, "server.mjs")], env, stderr: "inherit" }),
);
try {
  const info = client.getServerVersion();
  assert.equal(info?.name, "ai.scrapewise/scrapewise");
  const { tools } = await client.listTools();
  assert.ok(tools.length > 0, "tools/list is empty");
  for (const t of tools) assert.ok(t.name && t.inputSchema, `bad tool entry ${JSON.stringify(t).slice(0, 80)}`);
  const res = await client.callTool({ name: tools[0].name, arguments: {} });
  assert.equal(res.isError, true);
  assert.match(res.content[0].text, /SCRAPEWISE_API_KEY is not set/);
  assert.deepEqual((await client.listResources()).resources, []);
  assert.deepEqual((await client.listPrompts()).prompts, []);
  console.log(
    `smoke ok: ${info.name} ${info.version}, ${tools.length} tools listed with no key, tools/call without key -> clear error`,
  );
} finally {
  await client.close();
}
