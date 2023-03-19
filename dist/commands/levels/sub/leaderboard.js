"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboard = void 0;
const leaderboard = async (interaction, bot) => {
    const users = await bot.getTotalXP(interaction.guildId);
    const embed = bot.doLevelLB(users);
    return embed;
};
exports.leaderboard = leaderboard;
