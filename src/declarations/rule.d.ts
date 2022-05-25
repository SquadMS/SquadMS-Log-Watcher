declare interface Rule {
    regex: RegExp;
    onMatch(args: string[]): void;
}