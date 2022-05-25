import { Rule } from "../declarations/rule";
import Reader from "../Reader";

export default class NewGame implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogWorld: Bringing World \/([A-z]+)\/(?:Maps\/)?([A-z0-9-]+)\/(?:.+\/)?([A-z0-9-]+)(?:\.[A-z0-9-]+)/;

  onMatch(reader: Reader, args: string[]): void {
    if (args[5] === 'TransitionMap') {
      return;
    }
    const data = {
      ...reader.eventStore.WON,
      raw: args[0],
      time: args[1],
      chainID: args[2],
      dlc: args[3],
      mapClassname: args[4],
      layerClassname: args[5],
    };

    delete reader.eventStore.WON;

    reader.emit('NEW_GAME', data);
  }
}
