import Reader from "../Reader";

declare interface Rule {
  regex: RegExp;
  onMatch(reader: Reader, args: string[]): void;
}
