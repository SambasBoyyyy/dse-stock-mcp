# DSE Stock MCP Server
A very first MCP (Model Context Protocol) server that provides real-time and historical data for Dhaka Stock Exchange symbols, with a robust symbol resolver.

## Features
- **Real-time Data**: Get current stock prices and market data
- **Historical Data**: Fetch OHLC data for any date range
- **Company News**: Access latest news and announcements for any DSE-listed company
- **Symbol Resolution**: Validates and normalizes inputs (codes, names, aliases) before hitting the API
- **Comprehensive Coverage**: Support for all DSE-listed companies with robust symbol lookup

## Available Tools
- `get_current_price(symbol)` - Get real-time stock price and market data
- `get_historical_data(symbol, start_date, end_date)` - Fetch historical OHLC data
- `get_company_news(symbol)` - Get latest news and announcements for a company

**Input Flexibility**: All tools accept trading codes (e.g., `GP`, `UNILEVERCL`) or company names from the CSV.

## Installation
Prerequisites:
- Install Node.js LTS (includes npm and npx). Verify with:
  - `npx -v` (npm 5.2+ includes npx)

### Setup
1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Set your API key:
   ```bash
   export DSE_STOCK_API_KEY="YOUR_API_KEY"
   ```

## Usage
### Running the Server
```bash
npm start
```

### Development Mode
```bash
npm run dev:tsx
```

## Plug and Play Claude-Desktop/Cursor Integration
Add this configuration to your `.cursor/mcp.json` (workspace) or `~/.cursor/claude_desktop_config` (global):
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
Restart Claude-Desktop/Cursor to load the server.

## API Key
You need a valid API key to use this server. Set the `DSE_STOCK_API_KEY` environment variable with your API key.

**Get a free API key**: Contact samiulbasirbhuiyan1234@gmail.com to request your free API key.

## License
MIT License - see LICENSE file for details.
