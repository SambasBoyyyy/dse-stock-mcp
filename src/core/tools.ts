import { FastMCP } from "fastmcp";
import { z } from "zod";
import * as services from "./services/index.js";
import { resolveSymbol, listSymbols } from "./symbols/resolver.js";

/**
 * Register all tools with the MCP server
 * 
 * @param server The FastMCP server instance
 */
export function registerTools(server: FastMCP) {
  const getApiKey = (): string => {
    const key = process.env.DSE_STOCK_API_KEY;
    if (!key) {
      throw new Error(
        "Missing API key. Set DSE_STOCK_API_KEY in the MCP server environment."
      );
    }
    return key;
  };

  // DSE: Get current price for a symbol
  server.addTool({
    name: "get_current_price",
    description: "Fetch the latest market price and related fields for a stock symbol.",
    parameters: z.object({
      symbol: z.string().min(1).describe("Ticker symbol, e.g., GP")
    }),
    execute: async ({ symbol }: { symbol: string }) => {
      const apiKey = getApiKey();
      const url = "https://web-production-ebd3.up.railway.app/tools/get_current_price";
      const resolved = resolveSymbol(symbol);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "x-api-key": apiKey
        },
        body: JSON.stringify({ symbol: resolved.code })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch current price: ${response.status} ${text}`);
      }

      const data = await response.json();
      return JSON.stringify(data, null, 2);
    }
  });

  // DSE: Get historical OHLC data for a symbol between dates
  server.addTool({
    name: "get_historical_data",
    description: "Fetch historical OHLC data and summary for a stock symbol between dates.",
    parameters: z.object({
      symbol: z.string().min(1).describe("Ticker symbol, e.g., GP"),
      start_date: z.string().min(1).describe("Start date in YYYY-MM-DD"),
      end_date: z.string().min(1).describe("End date in YYYY-MM-DD")
    }),
    execute: async (
      { symbol, start_date, end_date }: { symbol: string; start_date: string; end_date: string }
    ) => {
      const apiKey = getApiKey();
      const url = "https://web-production-ebd3.up.railway.app/tools/get_historical_data";
      const resolved = resolveSymbol(symbol);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "x-api-key": apiKey
        },
        body: JSON.stringify({ symbol: resolved.code, start_date, end_date })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch historical data: ${response.status} ${text}`);
      }

      const data = await response.json();
      return JSON.stringify(data, null, 2);
    }
  });

  // Utility: List supported DSE symbols (code and name)
  server.addTool({
    name: "list_symbols",
    description: "List supported DSE trading codes with official names.",
    parameters: z.object({}),
    execute: async () => {
      return JSON.stringify(listSymbols(), null, 2);
    }
  });

  // Utility: Resolve free-text company name/alias to trading code
  server.addTool({
    name: "resolve_symbol",
    description: "Resolve a company name or alias to a DSE trading code.",
    parameters: z.object({
      query: z.string().min(1).describe("Company name, alias, or code")
    }),
    execute: async ({ query }: { query: string }) => {
      const r = resolveSymbol(query);
      return JSON.stringify(r, null, 2);
    }
  });

  // DSE: Get company news for a symbol
  server.addTool({
    name: "get_company_news",
    description: "Fetch all news items for a stock symbol.",
    parameters: z.object({
      symbol: z.string().min(1).describe("Ticker symbol, e.g., GP")
    }),
    execute: async ({ symbol }: { symbol: string }) => {
      const apiKey = getApiKey();
      const url = "https://web-production-ebd3.up.railway.app/tools/get_company_news";
      const resolved = resolveSymbol(symbol);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "x-api-key": apiKey
        },
        body: JSON.stringify({ symbol: resolved.code })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch company news: ${response.status} ${text}`);
      }

      const data = await response.json();
      return JSON.stringify(data, null, 2);
    }
  });
}