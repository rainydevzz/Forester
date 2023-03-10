import { MyClient } from "../bot";

export const name = 'ready';
export const run = async (bot: MyClient) => {
    console.log("Ready as", bot.user.tag);
    await bot.syncCommands();
    await bot.db.$connect();
}