import { ApplicationCommandData, ApplicationCommandType, ContextMenuCommandInteraction } from "discord.js";

export const command: ApplicationCommandData = {
    name: 'Invite',
    type: ApplicationCommandType.User
}

export const run = async (interaction: ContextMenuCommandInteraction) => {
    await interaction.reply({content: `Here's an invite to **Forestcord**\n${process.env.INVITE}`, ephemeral: true});
}