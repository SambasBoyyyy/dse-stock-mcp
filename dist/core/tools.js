import { z } from "zod";
/**
 * Register all tools with the MCP server
 *
 * @param server The FastMCP server instance
 */
export function registerTools(server) {
    const getApiKey = () => {
        const key = process.env.DSE_STOCK_API_KEY;
        if (!key) {
            throw new Error("Missing API key. Set DSE_STOCK_API_KEY in the MCP server environment.");
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
        execute: async ({ symbol }) => {
            const apiKey = getApiKey();
            const url = "https://web-production-ebd3.up.railway.app/tools/get_current_price";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                    "x-api-key": apiKey
                },
                body: JSON.stringify({ symbol })
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
        execute: async ({ symbol, start_date, end_date }) => {
            const apiKey = getApiKey();
            const url = "https://web-production-ebd3.up.railway.app/tools/get_historical_data";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                    "x-api-key": apiKey
                },
                body: JSON.stringify({ symbol, start_date, end_date })
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to fetch historical data: ${response.status} ${text}`);
            }
            const data = await response.json();
            return JSON.stringify(data, null, 2);
        }
    });
}
//# sourceMappingURL=tools.js.map