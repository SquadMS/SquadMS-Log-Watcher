import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class PlayerRevived implements Rule {
  regex = /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: (.+) has revived (.+)\./;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      ...reader.eventStore[match.matches[0]],
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      reviverName: match.matches[0],
      victimName: match.matches[1],
    };

    reader.emit('PLAYER_REVIVED', data);
  }
}
