import { logger } from "../utils/logger";
import { MyClient } from "../bot";

export const name = 'ready';
export const run = async (bot: MyClient) => {
    logger.info({READY: `Ready as ${bot.user.tag}`});
    await bot.syncCommands();
    try {
        await bot.db.$connect();
    } catch(err) {
        console.error(err);
    }
}