import { FastMCP } from "fastmcp";
import { registerTools } from "../core/tools.js";

// Create and start the MCP server
async function startServer() {
  try {
    // Create a new FastMCP server instance
    const server = new FastMCP({
      name: "MCP Server",
      version: "1.0.0"
    });

    // Register tools only
    registerTools(server);
    
    // Log server information
    console.error(`MCP Server initialized`);
    console.error("Server is ready to handle requests");
    
    return server;
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
}

// Export the server creation function
export default startServer; 