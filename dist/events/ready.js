"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'ready';
const run = async (bot) => {
    console.log("Ready as", bot.user.tag);
    await bot.syncCommands();
    await bot.db.$connect();
};
exports.run = run;
