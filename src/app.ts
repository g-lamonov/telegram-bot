import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import { Command } from "./commands/abstract.command";
import { StartCommand } from "./commands/start.command";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { CronService } from "./cron/cron.service";

class Bot {
  private _bot: Telegraf<IBotContext>;
  private _commands: Command[] = [];

  constructor(private readonly configService: ConfigService) {
    this._bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));
    this._bot.use(
      new LocalSession({
        database: 'sessions.json'
      }).middleware()
    );
  }

  public async init() {
    new CronService(this._bot).init();

    this._commands = [
      new StartCommand(this._bot)
    ];

    for (const command of this._commands)
      command.handle();

    this._bot.launch();
    console.log('Bot started!');
  }
}

const bot = new Bot(new ConfigService());
bot.init();
