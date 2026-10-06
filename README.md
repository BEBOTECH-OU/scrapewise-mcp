# ScrapeWise MCP Server

Scrape, clean and match product and price data from any website — from inside your AI agent.

ScrapeWise runs a hosted [Model Context Protocol](https://modelcontextprotocol.io) server. You
point your MCP client at one URL, add your API key, and your agent can build scrapers, run them,
and read the results back as structured data.

- **Endpoint:** `https://mcp.scrapewise.ai/mcp`
- **Transport:** Streamable HTTP
- **Registry name:** `ai.scrapewise/scrapewise` ([official MCP registry](https://registry.modelcontextprotocol.io))
- **Auth:** `Authorization: Bearer <your API key>`
- **Docs:** [scrapewise.ai/mcp](https://scrapewise.ai/mcp)

This repository holds the connection manifest and the per-client config for that server. The
server itself is hosted — there is nothing here to install or run.

## Get an API key

Sign up at [scrapewise.ai](https://scrapewise.ai), then go to **Settings → API Keys** and create
one. Pricing is pay-as-you-go.

## Connect

Replace `YOUR_SCRAPEWISE_API_KEY` in every snippet below.

### Claude Code

```bash
claude mcp add scrapewise --transport http https://mcp.scrapewise.ai/mcp \
  --header 'Authorization: Bearer YOUR_SCRAPEWISE_API_KEY'
```

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

Same shape, in `~/.cursor/mcp.json`:

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

VS Code is the odd one out: the map is `servers`, not `mcpServers`, and a remote server has to
name its transport with `"type": "http"`. Get either wrong and VS Code skips the entry without
telling you.

Open the Command Palette → **MCP: Open User Configuration**, then:

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

### Anything else

Any client that speaks Streamable HTTP works. Give it the endpoint, the `Authorization` header,
and the name `scrapewise`.

## What your agent can do

| Area | What it covers |
| --- | --- |
| Build | Preview a page, create a scraper from a URL or a cURL command, define the columns to extract |
| Organise | Group scrapers by project, add product URLs to a scraper's link list, share groups |
| Run | Run one scraper, a whole group, or an ad-hoc list of URLs; stop a run; read run errors |
| Read | Pull sample rows, full result sets, run history and per-run columns; export a group |
| Transform | Group-level post-process rules — currency conversion, quantity normalisation, price per unit |
| Monitor | Schedules, price monitoring with anchor competitors, data-quality and retention settings |

Tools are discoverable from the server itself once connected. The full reference lives at
[docs.scrapewise.ai](https://docs.scrapewise.ai).

## Manifest

[`server.json`](./server.json) is a mirror. The authority is
[`https://scrapewise.ai/server.json`](https://scrapewise.ai/server.json), which is generated from
the ScrapeWise site repo and checked by its test suite. If the two ever disagree, the hosted one
is right.

Namespace ownership for `ai.scrapewise/*` is proved by the Ed25519 public key published at
[`https://scrapewise.ai/.well-known/mcp-registry-auth`](https://scrapewise.ai/.well-known/mcp-registry-auth).

## Support

- Docs: [docs.scrapewise.ai](https://docs.scrapewise.ai)
- Email: siim.brazier@scrapewise.ai

## Licence

MIT — see [LICENSE](./LICENSE). Covers this repository's contents only, not the hosted service.
