import AdminBroadcast from './admin-broadcast';
import DeployableDamaged from './deployable-damaged';
import NewGame from './new-game';
import PlayerConnected from './player-connected';
import PlayerDamaged from './player-damaged';
import PlayerDied from './player-died';
import RoundWinner from './round-winner';

const rules: Rule[] = [
  new AdminBroadcast(),
  new DeployableDamaged(),
  new NewGame(),
  new PlayerConnected(),
  new PlayerDamaged(),
  new PlayerDied(),
  new RoundWinner(),
];

export default rules;
