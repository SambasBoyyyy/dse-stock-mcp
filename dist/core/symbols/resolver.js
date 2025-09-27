import { CODE_TO_SYMBOL, NAME_INDEX, DSE_SYMBOLS, normalizeName } from "./data.js";
export function resolveSymbol(input) {
    if (!input || !input.trim()) {
        throw new Error("Symbol is empty.");
    }
    const raw = input.trim();
    const upper = raw.toUpperCase();
    // Direct code match
    const codeHit = CODE_TO_SYMBOL[upper];
    if (codeHit) {
        return { code: codeHit.code, name: codeHit.name, matchedBy: "code" };
    }
    // Name/alias match
    const normalized = normalizeName(raw);
    const code = NAME_INDEX[normalized];
    if (code) {
        const s = CODE_TO_SYMBOL[code];
        return { code: s.code, name: s.name, matchedBy: "name" };
    }
    throw new Error(`Unknown symbol: "${input}". Use the list_symbols tool to view valid codes.`);
}
export function listSymbols() {
    return DSE_SYMBOLS.map((s) => ({ code: s.code, name: s.name }));
}
//# sourceMappingURL=resolver.js.map