import EventEmitter from 'events';
import path from 'path'
import { queue, QueueObject } from 'async'
import { Tail } from 'tail'
import Logger from '@skyraptor/logger'
import rules from './rules'
import moment from 'moment';

export default class Reader extends EventEmitter {

  /* Tail related */
  queue: QueueObject<any>
  tail: Tail

  /* Statistics */
  linesPerMinute: number = 0
  matchingLinesPerMinute: number = 0
  matchingLatency: number = 0

  logStatsInterval?: NodeJS.Timer

  constructor(logFile = 'SquadGame.log') {
    super();

    /* Create a new async queue to store lines as we get to make sure nothing does get lost */
    this.queue = queue(this.processLine);

    /* Initialize tail watch and register listener for new lines */
    this.tail = new Tail(path.resolve(logFile), {
      useWatchFile: true
    });
    this.tail.on('line', this.queue.push);
  }

  
  /**
   * Watches the log file using tail and starts the internal proccesses
   */
  async watch(): Promise<void>
  {
    Logger.verbose('LogParser', 1, 'Starting to watch(tail) the log file...');
    await this.tail.watch();
    Logger.verbose('LogParser', 1, 'Watch successfully started up!');

    this.logStatsInterval = setInterval(this.logStats, 60 * 1000);
  }

  /**
   * Gracefully stops active watch of the log file and kills the proccesses
   */
  async unwatch(): Promise<void>
  {
    Logger.verbose('LogParser', 1, 'Stopping active watch of log file...');
    await this.tail.unwatch();
    Logger.verbose('LogParser', 1, 'Watch successfully stopped!');

    if (this.logStatsInterval) {
      clearInterval(this.logStatsInterval);
    }
  }
  

  /**
   * Get all rules defined in the /rules subdirectory as instanced objectes.
   */
  private getRules(): Rule[]
  {
    return rules;
  }

  /**
   * Callback method to process a line as retrieved by tail
   */
  private processLine = async (line: string): Promise<void> => {
    Logger.verbose('LogParser', 4, `Matching on line: ${line}`);

    for (const rule of this.getRules()) {
      const match = line.match(rule.regex);
      if (!match) continue;

      Logger.verbose('LogParser', 3, `Matched on line: ${match[0]}`);

      match[1] = moment.utc(match[1], 'YYYY.MM.DD-hh.mm.ss:SSS').toDate();
      match[2] = parseInt(match[2]);

      rule.onMatch(match, this);

      this.matchingLinesPerMinute++;
      this.matchingLatency += Date.now() - match[1];

      break;
    }

    this.linesPerMinute++;
  }

  /**
   * Callback method to write statistics to log
   */
  private logStats = (): void => {
    Logger.verbose(
      'LogParser',
      1,
      `Lines parsed per minute: ${
        this.linesPerMinute
      } lines per minute | Matching lines per minute: ${
        this.matchingLinesPerMinute
      } matching lines per minute | Average matching latency: ${
        this.matchingLatency / this.matchingLinesPerMinute
      }ms`
    );

    this.linesPerMinute = 0;
    this.matchingLinesPerMinute = 0;
    this.matchingLatency = 0;
  }
}