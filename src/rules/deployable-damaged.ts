import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class DeployableDamaged implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQDeployable::)?TakeDamage\(\): ([A-z0-9_]+)_C_[0-9]+: ([0-9.]+) damage attempt by causer ([A-z0-9_]+)_C_[0-9]+ instigator (.+) with damage type ([A-z0-9_]+)_C health remaining ([0-9.]+)/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      deployable: match.matches[0],
      damage: parseFloat(match.matches[1]),
      weapon: match.matches[2],
      playerSuffix: match.matches[3],
      damageType: match.matches[4],
      healthRemaining: match.matches[5],
    };

    reader.eventStore[match.matches[0]] = data;

    reader.emit('DEPLOYABLE_DAMAGED', data);
  }
}
