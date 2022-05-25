import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class RoundWinner implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQGameMode::)?DetermineMatchWinner\(\): (.+) won on (.+)/;

  onMatch(reader: Reader, args: string[]): void {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      winner: args[3],
      layer: args[4],
    };

    if (reader.eventStore.WON)
    reader.eventStore.WON = {...data, winner: null};
    else reader.eventStore.WON = data;
  }
}
