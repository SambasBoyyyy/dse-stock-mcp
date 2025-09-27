import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// Resolve CSV path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_CSV_RELATIVE_PATH = path.join(__dirname, "../../../stocks_rows.csv");
function readCsvRaw(csvPath) {
    const filePath = csvPath && csvPath.trim().length > 0 ? csvPath : DEFAULT_CSV_RELATIVE_PATH;
    if (!fs.existsSync(filePath)) {
        throw new Error(`DSE symbols CSV not found at: ${filePath}`);
    }
    return fs.readFileSync(filePath, "utf8");
}
function parseCsvToSymbols(csvContent) {
    const lines = csvContent.split(/\r?\n/);
    const symbols = [];
    for (const line of lines) {
        if (!line || !line.trim())
            continue;
        // Expected shape: ",,CODE,Name,"
        const parts = line.split(",");
        if (parts.length < 4)
            continue;
        const code = parts[2]?.trim();
        const name = parts[3]?.trim();
        if (!code || !name || code === "trading_code" || code === "TRADING_CODE")
            continue;
        // Normalize common uppercase for code; keep name as-is
        symbols.push({ code: code.toUpperCase(), name });
    }
    return symbols;
}
function loadSymbols() {
    const csvOverride = process.env.DSE_SYMBOLS_CSV_PATH;
    const csv = readCsvRaw(csvOverride);
    const parsed = parseCsvToSymbols(csv);
    if (parsed.length === 0) {
        throw new Error("Parsed DSE symbols list is empty; check the CSV format.");
    }
    return parsed;
}
export const DSE_SYMBOLS = loadSymbols();
// Build quick lookup maps
export const CODE_TO_SYMBOL = Object.fromEntries(DSE_SYMBOLS.map((s) => [s.code.toUpperCase(), s]));
export function normalizeName(input) {
    return input
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
// Normalized index of names/aliases -> code
export const NAME_INDEX = (() => {
    const index = {};
    for (const s of DSE_SYMBOLS) {
        index[normalizeName(s.name)] = s.code;
        if (s.aliases) {
            for (const a of s.aliases) {
                index[normalizeName(a)] = s.code;
            }
        }
    }
    return index;
})();
//# sourceMappingURL=data.js.map