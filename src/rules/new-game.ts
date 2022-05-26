import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class NewGame implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogWorld: Bringing World \/([A-z]+)\/(?:Maps\/)?([A-z0-9-]+)\/(?:.+\/)?([A-z0-9-]+)(?:\.[A-z0-9-]+)/;

  onMatch(reader: Reader, match: MatchedLine): void {
    if (args[5] === 'TransitionMap') {
      return;
    }
    const data = {
      ...reader.eventStore.WON,
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      dlc: match.matches[0],
      mapClassname: match.matches[1],
      layerClassname: match.matches[2],
    };

    delete reader.eventStore.WON;

    reader.emit('NEW_GAME', data);
  }
}
