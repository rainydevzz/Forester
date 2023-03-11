"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runModal = void 0;
const discord_js_1 = require("discord.js");
const runModal = async (interaction, channel) => {
    const msg = interaction.fields.getTextInputValue('confession-body');
    await interaction.reply({ content: 'your confession has been sent!', ephemeral: true });
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Confession!")
        .setDescription(msg)
        .setTimestamp(new Date())
        .setColor("Random");
    await channel.send({ embeds: [embed] });
};
exports.runModal = runModal;
