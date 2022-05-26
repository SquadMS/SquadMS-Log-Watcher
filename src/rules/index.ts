import Rule from '../declarations/Rule';
import AdminBroadcast from './admin-broadcast';
import DeployableDamaged from './deployable-damaged';
import NewGame from './new-game';
import PlayerConnected from './player-connected';
import PlayerDamaged from './player-damaged';
import PlayerDied from './player-died';
import PlayerDisconnected from './player-disconnected';
import PlayerPossess from './player-possess';
import PlayerRevived from './player-revived';
import PlayerUnPossess from './player-un-possess';
import PlayerWounded from './player-wounded';
import RoundWinner from './round-winner';
import ServerTickRate from './server-tick-rate';
import SquadCreated from './squad-created';
import SteamIdConnected from './steamid-connected';

const rules: Rule[] = [
  new AdminBroadcast(),
  new DeployableDamaged(),
  new NewGame(),
  new PlayerConnected(),
  new PlayerDamaged(),
  new PlayerDied(),
  new PlayerDisconnected(),
  new PlayerPossess(),
  new PlayerRevived(),
  new PlayerUnPossess(),
  new PlayerWounded(),
  new RoundWinner(),
  new ServerTickRate(),
  new SquadCreated(),
  new SteamIdConnected(),
];

export default rules;
