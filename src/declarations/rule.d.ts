import Reader from '../Reader';
import MatchedLine from './MatchedLine';

declare interface Rule {
  regex: RegExp;
  onMatch(reader: Reader, match: MatchedLine): void;
}

export default Rule;
