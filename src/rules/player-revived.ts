export default class PlayerRevived implements Rule {
    regex = /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: (.+) has revived (.+)\./

    onMatch(args: string[]): void
    {
        const data = {
            ...logParser.eventStore[args[3]],
            raw: args[0],
            time: args[1],
            chainID: args[2],
            reviverName: args[3],
            victimName: args[4]
          };
      
          logParser.emit('PLAYER_REVIVED', data);
    }
}