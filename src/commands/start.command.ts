import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./abstract.command";

enum StartCommandAction {
  Like = 'like',
  Dislike = 'dislike',
}

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.start((ctx) => {
      ctx.reply("Do you like the bot?", Markup.inlineKeyboard([
        Markup.button.callback('👍', StartCommandAction.Like),
        Markup.button.callback('👎', StartCommandAction.Dislike),
      ]));
    });

    this.bot.action(StartCommandAction.Like, (ctx) => {
      ctx.session.like = true;
      ctx.editMessageText('🎉 Cool!');
    })

    this.bot.action(StartCommandAction.Dislike, (ctx) => {
      ctx.session.like = false;
      ctx.editMessageText('😕 Sorry.');
    })
  }
}
