"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beg = void 0;
const discord_js_1 = require("discord.js");
const beg = async (interaction, bot) => {
    const cooldown = bot.getCooldown(interaction.user.id, 'beg', 1800000);
    if (!cooldown[0]) {
        const remainder = cooldown[1];
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("Slow Down")
            .setDescription(`You must wait ${remainder} more minutes!`)
            .setColor("Red")
            .setTimestamp(new Date());
        return embed;
    }
    await bot.getBal(interaction.user);
    const add = Math.floor(Math.random() * 100);
    const bal = await bot.changeBal(interaction.user, add);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("You begged and received...")
        .setDescription(`${add} coins! your balance is now ${bal}`)
        .setColor("Random");
    return embed;
};
exports.beg = beg;
