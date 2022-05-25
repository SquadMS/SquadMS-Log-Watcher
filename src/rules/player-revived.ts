import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class PlayerRevived implements Rule {
  regex = /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: (.+) has revived (.+)\./;

  onMatch(reader: Reader, args: string[]): void {
    const data = {
      ...reader.eventStore[args[3]],
      raw: args[0],
      time: args[1],
      chainID: args[2],
      reviverName: args[3],
      victimName: args[4],
    };

    reader.emit('PLAYER_REVIVED', data);
  }
}
