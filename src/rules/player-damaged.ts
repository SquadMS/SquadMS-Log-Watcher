import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class PlayerDamaged implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: Player:(.+) ActualDamage=([0-9.]+) from (.+) caused by ([A-z_0-9]+)_C/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      victimName: match.matches[0],
      damage: parseFloat(match.matches[1]),
      attackerName: match.matches[2],
      weapon: match.matches[3],
    };

    reader.eventStore[match.matches[0]] = data;

    reader.emit('PLAYER_DAMAGED', data);
  }
}
