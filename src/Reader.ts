import { EventEmitter } from 'events';
import { resolve } from 'path';
import { queue, QueueObject } from 'async';
import { Tail } from 'tail';
import Logger from '@skyraptor/logger';
import rules from './rules';
import { utc } from 'moment';
import Rule from './declarations/Rule';

export default class Reader extends EventEmitter {
  /* Tail related */
  queue: QueueObject<string>;
  tail: Tail;

  /* Statistics */
  linesPerMinute = 0;
  matchingLinesPerMinute = 0;
  matchingLatency = 0;

  logStatsInterval?: NodeJS.Timer;

  constructor(logFile = 'SquadGame.log') {
    super();

    /* Create a new async queue to store lines as we get to make sure nothing does get lost */
    this.queue = queue(this.processLine);

    /* Initialize tail watch and register listener for new lines */
    this.tail = new Tail(resolve(logFile), {
      useWatchFile: true,
    });
    this.tail.on('line', this.queue.push);
  }

  /**
   * Watches the log file using tail and starts the internal proccesses
   */
  async watch(): Promise<void> {
    Logger.verbose('LogParser', 1, 'Starting to watch(tail) the log file...');
    await this.tail.watch();
    Logger.verbose('LogParser', 1, 'Watch successfully started up!');

    this.logStatsInterval = setInterval(this.logStats, 60 * 1000);
  }

  /**
   * Gracefully stops active watch of the log file and kills the proccesses
   */
  async unwatch(): Promise<void> {
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
  private getRules(): Rule[] {
    return rules;
  }

  /**
   * Callback method to process a line as retrieved by tail
   */
  private processLine = async (line: string): Promise<void> => {
    Logger.verbose('LogParser', 4, `Matching on line: ${line}`);

    for (const rule of this.getRules()) {
      const match = line.match(rule.regex);
      if (match) {
        const matchedLine = {
          raw: match[0],
          time: utc(match[1], 'YYYY.MM.DD-hh.mm.ss:SSS').toDate(),
          chainID: parseInt(match[2]),
          matches: match.splice(0, 3),
        };

        Logger.verbose('LogParser', 3, `Matched on line: ${matchedLine.raw}`);

        rule.onMatch(this, match);

        this.matchingLinesPerMinute++;
        this.matchingLatency += Date.now() - matchedLine.time.getTime();

        break;
      }
    }

    this.linesPerMinute++;
  };

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
  };
}
