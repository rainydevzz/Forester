import { EmbedBuilder, ModalSubmitInteraction, TextChannel } from "discord.js"

export const runModal = async (interaction: ModalSubmitInteraction, channel: TextChannel) => {
    const msg = interaction.fields.getTextInputValue('confession-body');
    await interaction.reply({content: 'your confession has been sent!', ephemeral: true});
    const embed = new EmbedBuilder()
        .setTitle("Confession!")
        .setDescription(msg)
        .setTimestamp(new Date())
        .setColor("Random");
        
    await channel.send({embeds: [embed]});
}