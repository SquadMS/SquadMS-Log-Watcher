import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class PlayerDied implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQSoldier::)?Die\(\): Player:(.+) KillingDamage=(?:-)*([0-9.]+) from ([A-z_0-9]+) caused by ([A-z_0-9]+)_C/;

  onMatch(reader: Reader, args: string[]): void {
    const data = {
      ...reader.eventStore[args[3]],
      raw: args[0],
      time: args[1],
      woundTime: args[1],
      chainID: args[2],
      victimName: args[3],
      damage: parseFloat(args[4]),
      attackerPlayerController: args[5],
      weapon: args[6],
    };

    reader.eventStore[args[3]] = data;

    reader.emit('PLAYER_DIED', data);
  }
}
