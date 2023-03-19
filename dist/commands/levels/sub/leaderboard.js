"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboard = void 0;
const discord_js_1 = require("discord.js");
const leaderboard = async (interaction, bot) => {
    const cooldown = bot.getCooldown(interaction.user.id, 'leaderboard', 180000);
    if (!cooldown[0]) {
        const remainder = cooldown[1];
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("Slow Down")
            .setDescription(`You must wait ${remainder} more minutes!`)
            .setColor("Red")
            .setTimestamp(new Date());
        return embed;
    }
    const users = await bot.getTotalXP(interaction.guildId);
    const embed = bot.doLevelLB(users, interaction.guildId);
    return embed;
};
exports.leaderboard = leaderboard;
