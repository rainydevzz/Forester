"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'about',
    description: 'about the bot',
    type: discord_js_1.ApplicationCommandType.ChatInput
};
const run = async (interaction) => {
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`About ${interaction.client.user.username}`)
        .setDescription("Private bot for Forestside.")
        .setThumbnail(interaction.client.user.avatarURL())
        .setColor("DarkGreen")
        .addFields({
        name: 'Library',
        value: `[Discord.js](https://discord.js.org/#/) v${discord_js_1.version}`
    }, {
        name: 'Source',
        value: '[Here](https://github.com/laserzz/Forester)'
    });
    await interaction.followUp({ embeds: [embed] });
};
exports.run = run;
