# DSE Stock MCP Server

A very first MCP (Model Context Protocol) server that provides real-time and historical data for Dhaka Stock Exchange symbols, with a robust symbol resolver.

## Features

- Validates and normalizes inputs (codes, names, aliases) before hitting the API
- Tools for current price and historical OHLC
- Utility tools to list symbols and resolve free-text to codes




## Available Tools

- `get_current_price(symbol)`
- `get_historical_data(symbol, start_date, end_date)`
- `list_symbols()`
Inputs can be trading codes (e.g., `GP`) or company names from the CSV.


## Installation

Prerequisites:
- Install Node.js LTS (includes npm and npx). Verify with:
  - `npx -v` (npm 5.2+ includes npx)

# Install dependencies
npm install


## Claude-Desktop/Cursor Integration

Copy this and paste into `.cursor/mcp.json` (workspace) or `~/.cursor/claude_desktop_config` (global):

```json
{
  "mcpServers": {
    "dse-stock-mcp": {
      "command": "npx",
      "args": ["-y", "github:SambasBoyyyy/dse-stock-mcp"],
      "env": {
        "DSE_STOCK_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Restart Claude-Desktop/Cursor to load the server and You're Ready!!.

