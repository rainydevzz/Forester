import { ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandData, EmbedBuilder } from "discord.js";
import { MyClient } from "../bot";

export const command: ApplicationCommandData = {
    name: 'stats',
    description: 'see resource stats, bot admins only',
    type: ApplicationCommandType.ChatInput
}

export const run = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    if(!bot.isOwner(interaction.user.id)) {
        await interaction.followUp({content: "you must be a bot admin to use this command!", ephemeral: true});
        return;
    }
    const embed = new EmbedBuilder()
        .setTitle("Stats For The Bot")
        .setDescription("Resource stats")
        .setFields(
            {
                name: 'Memory',
                value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
            }
        )
        .setTimestamp(new Date())
        .setThumbnail(`${bot.user.avatarURL()}`)
        .setColor("Aqua")

    await interaction.followUp({embeds: [embed]});
}