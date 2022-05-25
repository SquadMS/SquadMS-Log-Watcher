export default class implements Rule {
    regex = /^\[([0-9.:-]+)]\[([ 0-9]*)]LogSquad: Player:(.+) ActualDamage=([0-9.]+) from (.+) caused by ([A-z_0-9]+)_C/

    onMatch(args: string[]): void
    {
        const data = {
            raw: args[0],
            time: args[1],
            chainID: args[2],
            victimName: args[3],
            damage: parseFloat(args[4]),
            attackerName: args[5],
            weapon: args[6]
        }
    }
}