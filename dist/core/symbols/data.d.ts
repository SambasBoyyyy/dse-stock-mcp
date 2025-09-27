export type DseSymbol = {
    code: string;
    name: string;
    aliases?: string[];
};
export declare const DSE_SYMBOLS: DseSymbol[];
export declare const CODE_TO_SYMBOL: Record<string, DseSymbol>;
export declare function normalizeName(input: string): string;
export declare const NAME_INDEX: Record<string, string>;
