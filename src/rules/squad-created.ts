import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class SquadCreated implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: (.+) \(Steam ID: ([0-9]{17})\) has created Squad (\d+) \(Squad Name: (.+)\) on (.+)/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      playerName: match.matches[0],
      playerSteamID: match.matches[1],
      squadID: match.matches[2],
      squadName: match.matches[3],
      teamName: match.matches[4],
    };

    reader.emit('SQUAD_CREATED', data);
  }
}
