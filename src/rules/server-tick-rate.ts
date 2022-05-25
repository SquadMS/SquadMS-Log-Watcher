import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class ServerTickRate implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: USQGameState: Server Tick Rate: ([0-9.]+)/;

  onMatch(reader: Reader, args: string[]): void {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      tickRate: parseFloat(args[3]),
    };

    reader.emit('TICK_RATE', data);
  }
}
