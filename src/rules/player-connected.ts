import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class PlayerConnected implements Rule {
  regex = /^\[([0-9.:-]+)]\[([ 0-9]*)]LogNet: Join succeeded: (.+)/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      playerSuffix: match.matches[0],
      steamID: reader.eventStore['steamid-connected'],
    };

    reader.emit('PLAYER_CONNECTED', data);
  }
}
