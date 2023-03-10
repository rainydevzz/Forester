"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const logger_1 = require("../utils/logger");
const greets_1 = require("../handlers/greets");
exports.name = 'guildMemberRemove';
const run = async (member, bot) => {
    logger_1.logger.info({ memberRemove: `${member.user.tag} has left.` });
    await (0, greets_1.handleGreets)(member, bot, 'goodbye');
};
exports.run = run;
