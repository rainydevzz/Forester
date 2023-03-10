import { ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandData } from "discord.js";

export const command: ApplicationCommandData = {
    name: 'ping',
    description: 'pong',
    type: ApplicationCommandType.ChatInput
}

export const run = async (interaction: ChatInputCommandInteraction) => {
    await interaction.followUp({content: "pong!", ephemeral: true});
}