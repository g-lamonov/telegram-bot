import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { ICronService } from "./cron.interface";
import cron from "node-cron";

export class CronService implements ICronService {
  constructor(
    private readonly bot: Telegraf<IBotContext>
  ) {}

  init(): void {
    cron.schedule("*/5 * * * * *", async () => {
      // TODO
    }
  };
}
