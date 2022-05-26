import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class ServerTickRate implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: USQGameState: Server Tick Rate: ([0-9.]+)/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      tickRate: parseFloat(match.matches[0]),
    };

    reader.emit('TICK_RATE', data);
  }
}
