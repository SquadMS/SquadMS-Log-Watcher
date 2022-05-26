import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class PlayerWounded implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQSoldier::)?Wound\(\): Player:(.+) KillingDamage=(?:-)*([0-9.]+) from ([A-z_0-9]+) caused by ([A-z_0-9]+)_C/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      ...reader.eventStore[match.matches[0]],
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      victimName: match.matches[0],
      damage: parseFloat(match.matches[1]),
      attackerPlayerController: match.matches[2],
      weapon: match.matches[3],
    };

    reader.eventStore[match.matches[0]] = data;

    reader.emit('PLAYER_WOUNDED', data);
  }
}
