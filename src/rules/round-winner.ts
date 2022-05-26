import Rule from '../declarations/Rule';
import MatchedLine from '../declarations/MatchedLine';
import Reader from '../Reader';

export default class RoundWinner implements Rule {
  regex =
    /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquadTrace: \[DedicatedServer](?:ASQGameMode::)?DetermineMatchWinner\(\): (.+) won on (.+)/;

  onMatch(reader: Reader, match: MatchedLine): void {
    const data = {
      raw: match.raw,
      time: match.time,
      chainID: match.chainID,
      winner: match.matches[0],
      layer: match.matches[1],
    };

    if (reader.eventStore.WON)
      reader.eventStore.WON = { ...data, winner: null };
    else reader.eventStore.WON = data;
  }
}
