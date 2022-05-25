import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class PlayerDisconnected implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogEasyAntiCheatServer: \[[0-9:]+] \[[A-z]+] \[EAC Server] \[Info] \[UnregisterClient] Client: ([A-z0-9]+) PlayerGUID: ([0-9]{17})/;

  onMatch(reader: Reader, args: string[]): void {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      steamID: args[4],
    };

    reader.emit('PLAYER_DISCONNECTED', data);
  }
}
