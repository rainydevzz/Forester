import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextChannel, TextInputBuilder, TextInputStyle } from "discord.js";
import { MyClient } from "../../bot";
import { runModal } from "./confess-modal";

export const id = 'confess-btn';

export const run = async (interaction: ButtonInteraction, bot: MyClient) => {
    const res = await bot.db.confession.findFirst({
        where: {guild: interaction.guildId}
    });

    const text = new TextInputBuilder()
        .setCustomId('confession-body')
        .setLabel('Confession Body')
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(1500)
        .setPlaceholder('Type your confession here!');

    const body = new ActionRowBuilder<TextInputBuilder>()
        .setComponents(text)
    
    const channel = bot.channels.cache.get(res.channel) as TextChannel;
    const modal = new ModalBuilder()
        .setTitle("Confession")
        .setCustomId('confess-modal')
        .setComponents(body);

    await interaction.showModal(modal);
    const modalInteraction = await interaction.awaitModalSubmit({time: 300000});
    await runModal(modalInteraction, channel);
}