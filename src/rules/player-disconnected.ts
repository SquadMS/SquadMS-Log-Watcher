import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class PlayerDisconnected implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogEasyAntiCheatServer: \[[0-9:]+] \[[A-z]+] \[EAC Server] \[Info] \[UnregisterClient] Client: ([A-z0-9]+) PlayerGUID: ([0-9]{17})/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      steamID: match.matches[1],
    };

    reader.emit('PLAYER_DISCONNECTED', data);
  }
}
