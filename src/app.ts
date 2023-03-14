import { session, Telegraf } from "telegraf";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";

class Bot {
  bot: Telegraf<IBotContext>;

  constructor(private readonly configService: ConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));
    this.bot.use(session());
  }

  init() {
    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
