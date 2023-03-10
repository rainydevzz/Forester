"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const greets_1 = require("../handlers/greets");
exports.name = 'guildMemberAdd';
const run = async (member, bot) => {
    await (0, greets_1.handleGreets)(member, bot, 'welcome');
};
exports.run = run;
