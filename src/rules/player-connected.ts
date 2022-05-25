import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class PlayerConnected implements Rule {
  regex = /^\[([0-9.:-]+)]\[([ 0-9]*)]LogNet: Join succeeded: (.+)/;

  onMatch(reader: Reader, args: string[]): void {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      playerSuffix: args[3],
      steamID: reader.eventStore['steamid-connected'],
    };

    reader.emit('PLAYER_CONNECTED', data);
  }
}
