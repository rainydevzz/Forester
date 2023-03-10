"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const logger_1 = require("../utils/logger");
const greets_1 = require("../handlers/greets");
exports.name = 'guildMemberAdd';
const run = async (member, bot) => {
    logger_1.logger.info({ MEMBER_ADD: `${member.user.tag} has joined.` });
    await (0, greets_1.handleGreets)(member, bot, 'welcome');
};
exports.run = run;
