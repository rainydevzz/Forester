"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'stats',
    description: 'see resource stats, bot admins only',
    type: discord_js_1.ApplicationCommandType.ChatInput
};
const run = async (interaction, bot) => {
    if (!bot.isOwner(interaction.user.id)) {
        await interaction.followUp({ content: "you must be a bot admin to use this command!", ephemeral: true });
        return;
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Stats For The Bot")
        .setDescription("Resource stats")
        .setFields({
        name: 'Memory',
        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    })
        .setTimestamp(new Date())
        .setThumbnail(`${bot.user.avatarURL()}`)
        .setColor("Aqua");
    await interaction.followUp({ embeds: [embed] });
};
exports.run = run;
