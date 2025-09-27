export type ResolveResult = {
    code: string;
    name: string;
    matchedBy: "code" | "name" | "alias";
};
export declare function resolveSymbol(input: string): ResolveResult;
export declare function listSymbols(): {
    code: string;
    name: string;
}[];
