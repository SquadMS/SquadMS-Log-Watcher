import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class PlayerUnPossess implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQPlayerController::)?OnUnPossess\(\): PC=(.+)/;

  onMatch(reader: Reader, args: string[]): void {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      playerSuffix: args[3],
      switchPossess:
        args[3] in reader.eventStore &&
        reader.eventStore[args[3]] === args[2],
    };

    delete reader.eventStore[args[3]];

    reader.emit('PLAYER_UNPOSSESS', data);
  }
}
