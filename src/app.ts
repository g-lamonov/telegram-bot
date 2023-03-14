import { session, Telegraf } from "telegraf";
import { Command } from "./commands/command.class";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";

class Bot {
  private _bot: Telegraf<IBotContext>;
  private _commands: Command[] = [];

  constructor(private readonly configService: ConfigService) {
    this._bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));
    this._bot.use(session());
  }

  public init() {
    for (const command of this._commands)
      command.handle();

    this._bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
