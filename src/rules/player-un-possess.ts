import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class PlayerUnPossess implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQPlayerController::)?OnUnPossess\(\): PC=(.+)/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      playerSuffix: match.matches[0],
      switchPossess:
        match.matches[0] in reader.eventStore &&
        reader.eventStore[match.matches[0]] === match.chainID,
    };

    delete reader.eventStore[match.matches[0]];

    reader.emit('PLAYER_UNPOSSESS', data);
  }
}
