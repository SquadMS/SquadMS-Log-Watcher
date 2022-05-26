import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class SteamIdConnected implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogEasyAntiCheatServer: \[[0-9:]+] \[[A-z]+] \[EAC Server] \[Info] \[RegisterClient] Client: ([A-z0-9]+) PlayerGUID: ([0-9]{17}) PlayerIP: [0-9]{17} OwnerGUID: [0-9]{17} PlayerName: (.+)/;

  onMatch(reader: Reader, match: MatchedLine): void {
    reader.eventStore['steamid-connected'] = match.matches[1];
  }
}
