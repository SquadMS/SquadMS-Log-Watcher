import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class PlayerPossess implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQPlayerController::)?OnPossess\(\): PC=(.+) Pawn=([A-z0-9_]+)_C/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      playerSuffix: match.matches[0],
      possessClassname: match.matches[1],
    };

    reader.eventStore[match.matches[0]] = match.chainID;

    reader.emit('PLAYER_POSSESS', data);
  }
}
