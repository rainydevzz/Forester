"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balance = void 0;
const discord_js_1 = require("discord.js");
const balance = async (interaction, bot) => {
    const bal = await bot.getBal(interaction.user);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`Balance of ${interaction.user.tag}`)
        .setFields({
        name: 'Balance',
        value: `${bal}`
    })
        .setColor("Aqua")
        .setThumbnail(interaction.user.defaultAvatarURL);
    return embed;
};
exports.balance = balance;
