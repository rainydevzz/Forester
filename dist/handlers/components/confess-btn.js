"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.id = void 0;
const discord_js_1 = require("discord.js");
const confess_modal_1 = require("./confess-modal");
exports.id = 'confess-btn';
const run = async (interaction, bot) => {
    const res = await bot.db.confession.findFirst({
        where: { guild: interaction.guildId }
    });
    const text = new discord_js_1.TextInputBuilder()
        .setCustomId('confession-body')
        .setLabel('Confession Body')
        .setStyle(discord_js_1.TextInputStyle.Paragraph)
        .setMaxLength(1500)
        .setPlaceholder('Type your confession here!');
    const body = new discord_js_1.ActionRowBuilder()
        .setComponents(text);
    const channel = bot.channels.cache.get(res.channel);
    const modal = new discord_js_1.ModalBuilder()
        .setTitle("Confession")
        .setCustomId('confess-modal')
        .setComponents(body);
    await interaction.showModal(modal);
    const modalInteraction = await interaction.awaitModalSubmit({ time: 300000 });
    await (0, confess_modal_1.runModal)(modalInteraction, channel);
};
exports.run = run;
