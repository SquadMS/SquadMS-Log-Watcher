import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class AdminBroadcast implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: ADMIN COMMAND: Message broadcasted <(.+)> from (.+)/;

  onMatch(reader: Reader, args: string[]): void {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      message: args[3],
      from: args[4],
    };

    reader.emit('ADMIN_BROADCAST', data);
  }
}
