import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class PlayerPossess implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQPlayerController::)?OnPossess\(\): PC=(.+) Pawn=([A-z0-9_]+)_C/;

  onMatch(reader: Reader, args: string[]): void {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      playerSuffix: args[3],
      possessClassname: args[4],
    };

    reader.eventStore[args[3]] = args[2];

    reader.emit('PLAYER_POSSESS', data);
  }
}