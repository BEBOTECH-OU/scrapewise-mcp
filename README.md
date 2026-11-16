# ScrapeWise MCP Server

ScrapeWise turns any website into clean, matched, AI-ready product data.

Clean, matched, AI-ready product data from any website, served by a hosted
[Model Context Protocol](https://modelcontextprotocol.io) server. Point your MCP client at one
address and add your API key. Your agent can then read clean product and price data from any shop
or from Amazon, see the same product matched across shops, search Google and Amazon, fetch web
pages, read the rows saved in your account and, with a Full key, build and run scrapers.

**Categories:** Web Scraping, Price Monitoring, Product Data, E-commerce

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=scrapewise&config=eyJ1cmwiOiJodHRwczovL21jcC5zY3JhcGV3aXNlLmFpL21jcCIsImhlYWRlcnMiOnsiQXV0aG9yaXphdGlvbiI6IkJlYXJlciBZT1VSX1NDUkFQRVdJU0VfQVBJX0tFWSJ9fQ%3D%3D)
[![Add to VS Code](https://img.shields.io/badge/VS_Code-Add_ScrapeWise-0098FF?logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=scrapewise&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.scrapewise.ai%2Fmcp%22%2C%22headers%22%3A%7B%22Authorization%22%3A%22Bearer%20YOUR_SCRAPEWISE_API_KEY%22%7D%7D)

After the one-click install, replace `YOUR_SCRAPEWISE_API_KEY` with your own key.

- **Endpoint:** `https://mcp.scrapewise.ai/mcp`
- **Transport:** Streamable HTTP
- **Auth:** `Authorization: Bearer <your API key>`
- **Registry name:** `ai.scrapewise/scrapewise` ([official MCP registry](https://registry.modelcontextprotocol.io))
- **Docs:** [scrapewise.ai/mcp](https://scrapewise.ai/mcp)

This repository holds the connection manifest, the per-client config for that server, and a small
optional stdio bridge (`stdio/server.mjs`) for clients and tools that only run local servers. The
server itself is hosted, so most clients need nothing from here except the address.

## Get an API key

Sign up at [scrapewise.ai](https://scrapewise.ai), then go to **Settings > API Keys**. Pricing is
pay-as-you-go.

Your key decides what your agent can do. There is one address for every key.

- **Read key (`LLM_READ`)** can read your groups, scrapers, runs and saved rows, preview changes,
  and clean rows you already have. It cannot spend credits or change anything.
- **Full key (`LLM_FULL`)** can also run the paid data tools and build, run and change scrapers.

## Connect

Replace `YOUR_SCRAPEWISE_API_KEY` in every snippet below.

### Claude Code

```bash
claude mcp add scrapewise --transport http https://mcp.scrapewise.ai/mcp \
  --header 'Authorization: Bearer YOUR_SCRAPEWISE_API_KEY'
```

### Use with Claude Code

This repository is also a Claude Code plugin. It adds the `scrapewise` MCP server and keeps your key
out of the config file.

1. Set your key in the shell that starts Claude Code (Read or Full, from **Settings > API Keys**):

   ```bash
   export SCRAPEWISE_API_KEY=YOUR_SCRAPEWISE_API_KEY
   ```

2. In Claude Code, add this repository as a marketplace source and install the plugin with `/plugin`:

   ```text
   /plugin marketplace add BEBOTECH-OU/scrapewise-mcp
   /plugin install scrapewise
   ```

   To try it from a local clone without installing, run `claude --plugin-dir ./scrapewise-mcp`.

The plugin sends `Authorization: Bearer ${SCRAPEWISE_API_KEY}` to `https://mcp.scrapewise.ai/mcp`.
The `claude mcp add` command above works too if you prefer not to use a plugin.

### Claude Desktop

`claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "scrapewise": {
      "url": "https://mcp.scrapewise.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_SCRAPEWISE_API_KEY"
      }
    }
  }
}
```

### Cursor

Use the **Add to Cursor** button above, or put the same block in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "scrapewise": {
      "url": "https://mcp.scrapewise.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_SCRAPEWISE_API_KEY"
      }
    }
  }
}
```

### VS Code

Use the **Add to VS Code** button above, or open the Command Palette, run
**MCP: Open User Configuration** and add:

```json
{
  "servers": {
    "scrapewise": {
      "type": "http",
      "url": "https://mcp.scrapewise.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_SCRAPEWISE_API_KEY"
      }
    }
  }
}
```

VS Code uses `servers`, not `mcpServers`, and needs `"type": "http"`. If either is wrong, VS Code
skips the entry without an error.

### Gemini CLI

```bash
gemini mcp add --transport http scrapewise https://mcp.scrapewise.ai/mcp \
  --header "Authorization: Bearer YOUR_SCRAPEWISE_API_KEY"
```

Or install this repository as an extension. It asks for your key and keeps it out of the config file:

```bash
gemini extensions install https://github.com/BEBOTECH-OU/scrapewise-mcp
```

### LM Studio

Open **Program > Edit mcp.json** and add:

```json
{
  "mcpServers": {
    "scrapewise": {
      "url": "https://mcp.scrapewise.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_SCRAPEWISE_API_KEY"
      }
    }
  }
}
```

### Any other client

Any client that speaks Streamable HTTP works. Give it the endpoint, the `Authorization` header and
the name `scrapewise`.

### Local stdio bridge (Docker or Node)

For clients that start a local process, this repository has a small stdio server that forwards
every tool call to `https://mcp.scrapewise.ai/mcp` with your key. It lists the tools without a key,
but running a tool needs `SCRAPEWISE_API_KEY`. Without a key, each call returns a clear error and
nothing runs.

```bash
# Node 20+
git clone https://github.com/BEBOTECH-OU/scrapewise-mcp && cd scrapewise-mcp
npm ci --omit=dev
SCRAPEWISE_API_KEY=YOUR_SCRAPEWISE_API_KEY node stdio/server.mjs

# or Docker (Dockerfile in this repository)
docker run -i --rm -e SCRAPEWISE_API_KEY=YOUR_SCRAPEWISE_API_KEY <image built from this repo>
```

Optional: `SCRAPEWISE_MCP_URL` (default `https://mcp.scrapewise.ai/mcp`) and
`SCRAPEWISE_CATALOG_URL` (default `<host>/.well-known/mcp/tools.json`).

### Public tool list

Anyone can read the tool list, with no key needed, at
[`https://mcp.scrapewise.ai/.well-known/mcp/tools.json`](https://mcp.scrapewise.ai/.well-known/mcp/tools.json).
It shows what a Full key sees. The MCP Server Card is at
[`https://mcp.scrapewise.ai/mcp/server-card`](https://mcp.scrapewise.ai/mcp/server-card).
The `/mcp` endpoint itself still asks for a key or an OAuth sign-in.

## What your agent can do

| Area | What it covers | Key |
| --- | --- | --- |
| Products | Product rows from any shop: name, price, currency, availability, brand, SKU/GTIN/EAN, images, description, rating. Amazon product pages, optionally with every seller's price | Full |
| Find | Local businesses from Google Maps: name, address, phone, website, rating (up to 20 per call). Amazon seller leads. idealo shop offers | Full |
| Search | Google web, news and shopping results; Amazon search results; Google Trends over time | Full |
| Fetch | The text or HTML of one public web page | Full |
| Clean | Tidy rows you already have: EUR prices, price per kg, litre or piece, trimmed text, no duplicates. Free, nothing is fetched | Read |
| Follow | Long jobs: progress and rows (Read), cancel (Full) | Read |
| Read | Your groups, scrapers, runs, saved rows, match results and settings | Read |
| Build and run | Preview a page, create scrapers from a URL or a cURL command, add product links, run and stop scrapers and groups | Full |
| Rules and monitoring | Group rules (currency, price per unit), price monitoring, schedules, retention, matching setup | Full |

Every paid tool states its price and takes `quote_only: true`, which returns the price and your
wallet balance without spending anything.

## Tools

The server sends its own tool list when you connect, so that list is always right. On 9 November
2026 a Read key saw 48 tools and a Full key saw 114.

**Data tools (Full key):** `get_product_data` · `get_amazon_product` · `find_local_businesses` ·
`amazon_seller_leads` · `idealo_offers` · `google_search` · `search_amazon` · `google_trends` ·
`fetch_page` · `cancel_job`

**Free tools (both keys):** `clean_product_data` · `get_results` and every `scrapewise_get_*`,
`scrapewise_list_*`, `scrapewise_search_*` and `scrapewise_preview_*` tool.

**Setup tools (Full key):** every `scrapewise_create_*`, `scrapewise_update_*`, `scrapewise_run_*`,
`scrapewise_stop_*`, `scrapewise_cancel_*` and `scrapewise_delete_*` tool. Each delete has a
`_preview` tool that shows what would go, without deleting anything.

Full documentation: [docs.scrapewise.ai](https://docs.scrapewise.ai).

## Manifest

[`server.json`](./server.json) is a mirror. The authority is
[`https://scrapewise.ai/server.json`](https://scrapewise.ai/server.json), which is served from the
ScrapeWise site repo and checked by its test suite. If the two ever disagree, the hosted one is
right.

Namespace ownership for `ai.scrapewise/*` is proved by the Ed25519 public key published at
[`https://scrapewise.ai/.well-known/mcp-registry-auth`](https://scrapewise.ai/.well-known/mcp-registry-auth).

## Support

- Docs: [docs.scrapewise.ai](https://docs.scrapewise.ai)
- Email: siim.brazier@scrapewise.ai

## Licence

MIT, see [LICENSE](./LICENSE). Covers this repository's contents only, not the hosted service.
