declare type MatchedLine = {
  raw: string;
  time: Date;
  chainID: number;
  matches: string[];
};

export default MatchedLine;
