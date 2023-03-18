"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daily = void 0;
const discord_js_1 = require("discord.js");
const daily = async (interaction, bot) => {
    const cooldown = bot.getCooldown(interaction.user.id, 'beg', 86400 * 1000);
    if (!cooldown[0]) {
        const remainder = cooldown[1];
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("Slow Down")
            .setDescription(`You must wait ${remainder} more minutes!`)
            .setColor("Red")
            .setTimestamp(new Date());
        return embed;
    }
    await bot.changeBal(interaction.user, 500);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Daily Received!")
        .setDescription("You got your 500 coins!")
        .setTimestamp(new Date())
        .setColor("Random");
    return embed;
};
exports.daily = daily;
