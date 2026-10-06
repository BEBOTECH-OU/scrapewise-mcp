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

## Tools

The server advertises its own tool list once connected, so this is a reference rather than the
source of truth. What a given API key sees can differ. Full documentation at
[docs.scrapewise.ai](https://docs.scrapewise.ai).

**Build a scraper**

`scrapewise_preview_scraper_from_url` · `scrapewise_preview_scraper_from_curl` ·
`scrapewise_preview_scraper_preview_rule` · `scrapewise_create_scraper` ·
`scrapewise_create_scraper_v2` · `scrapewise_create_file_scraper` ·
`scrapewise_get_scraper` · `scrapewise_get_scraper_v2` · `scrapewise_get_scraper_list` ·
`scrapewise_get_scraper_config_parameters` · `scrapewise_update_scraper_schema` ·
`scrapewise_update_scraper_fallback` · `scrapewise_update_file_scraper_file` ·
`scrapewise_delete_scraper` · `scrapewise_delete_scraper_preview`

**Organise scrapers and their URLs**

`scrapewise_create_scraper_group` · `scrapewise_get_scraper_group_list` ·
`scrapewise_delete_scraper_group` · `scrapewise_delete_scraper_group_preview` ·
`scrapewise_create_scraper_site` · `scrapewise_get_scraper_site` ·
`scrapewise_get_scraper_site_links` · `scrapewise_update_scraper_site_from_source` ·
`scrapewise_delete_scraper_site` · `scrapewise_get_scraper_sitemaps` ·
`scrapewise_get_scraper_shared_group_list` · `scrapewise_list_scraper_shared_group_list` ·
`scrapewise_update_scraper_shared_group`

**Run**

`scrapewise_run_scraper` · `scrapewise_run_scraper_group` · `scrapewise_run_scraper_url_list` ·
`scrapewise_run_scraper_data_group` · `scrapewise_run_scraper_sitemaps_harvest` ·
`scrapewise_stop_scraper` · `scrapewise_stop_scraper_group` ·
`scrapewise_stop_scraper_shared_group` · `scrapewise_get_scraper_load_history` ·
`scrapewise_get_scraper_job_errors` · `scrapewise_get_scraper_load_site` ·
`scrapewise_get_scraper_load_site_content`

**Read the data**

`scrapewise_get_scraper_sample_data` · `scrapewise_get_scraper_data_group` ·
`scrapewise_get_scraper_data_group_client` · `scrapewise_get_scraper_data_group_categories` ·
`scrapewise_update_scraper_data_group_category` ·
`scrapewise_delete_scraper_data_group_category` ·
`scrapewise_delete_scraper_data_group_category_preview` · `scrapewise_get_run_columns` ·
`scrapewise_get_run_columns_batch` · `scrapewise_export_scraper_data_group` ·
`scrapewise_delete_scraper_data` · `scrapewise_delete_scraper_data_preview`

**Clean and convert**

`scrapewise_get_scraper_group_post_process_rules` ·
`scrapewise_update_scraper_group_post_process_rules` ·
`scrapewise_update_scraper_group_currency` · `scrapewise_update_scraper_group_ai_control` ·
`scrapewise_update_scraper_group_data_quality` · `scrapewise_create_customer_schema` ·
`scrapewise_list_customer_schema` · `scrapewise_delete_customer_schema` ·
`scrapewise_delete_customer_schema_preview`

**Monitor prices**

`scrapewise_update_scraper_group_price_monitor` ·
`scrapewise_get_scraper_group_price_monitor_anchor_competitors` ·
`scrapewise_update_scraper_group_price_monitor_anchor_competitor` ·
`scrapewise_delete_scraper_group_price_monitor_anchor_competitor` ·
`scrapewise_list_scraper_group_price_monitor_picks` ·
`scrapewise_update_scraper_group_price_monitor_pick` ·
`scrapewise_delete_scraper_group_price_monitor_pick`

**Schedule and retain**

`scrapewise_update_scraper_group_schedule` · `scrapewise_update_scraper_group_start_type` ·
`scrapewise_update_scraper_group_retention` · `scrapewise_update_scraper_retention`

**Enrichment and SEO fields**

`scrapewise_get_enrichment` · `scrapewise_delete_enrichment` ·
`scrapewise_list_enrichable_scrapers` · `scrapewise_get_scraper_seo_fields` ·
`scrapewise_search_scraper_seo_fields`

**Account**

`scrapewise_create_api_key` · `scrapewise_list_api_keys` · `scrapewise_delete_api_key`

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
