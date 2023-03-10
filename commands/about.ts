import { ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandData, EmbedBuilder, version } from "discord.js";

export const command: ApplicationCommandData = {
    name: 'about',
    description: 'about the bot',
    type: ApplicationCommandType.ChatInput
}

export const run = async (interaction: ChatInputCommandInteraction) => {
    const embed = new EmbedBuilder()
        .setTitle(`About ${interaction.client.user.username}`)
        .setDescription("Private bot for Forestside.")
        .setThumbnail(interaction.client.user.avatarURL())
        .setColor("DarkGreen")
        .addFields(
            {
                name: 'Library',
                value: `[Discord.js](https://discord.js.org/#/) v${version}`
            },
            {
                name: 'Source',
                value: '[Here](https://github.com/laserzz/Forester)'
            }
        );

    await interaction.followUp({embeds: [embed]});
}