import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class AdminBroadcast implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: ADMIN COMMAND: Message broadcasted <(.+)> from (.+)/;

  onMatch(reader: Reader, match: MatchedLine): void {
    reader.emit('ADMIN_BROADCAST', {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      message: match.matches[0],
      from: match.matches[1],
    });
  }
}
