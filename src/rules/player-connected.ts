export default class PlayerConnected implements Rule {
  regex = /^\[([0-9.:-]+)]\[([ 0-9]*)]LogNet: Join succeeded: (.+)/;

  onMatch(args: string[]): void {
    const data = {
      raw: args[0],
      time: args[1],
      chainID: args[2],
      playerSuffix: args[3],
      steamID: logParser.eventStore['steamid-connected'],
    };

    logParser.emit('PLAYER_CONNECTED', data);
  }
}
