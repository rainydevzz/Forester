"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const logger_1 = require("../utils/logger");
exports.name = 'ready';
const run = async (bot) => {
    logger_1.logger.info({ READY: `Ready as ${bot.user.tag}` });
    await bot.syncCommands();
    try {
        await bot.db.$connect();
    }
    catch (err) {
        console.error(err);
    }
};
exports.run = run;
