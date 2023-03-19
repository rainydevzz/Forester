import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js"
import { MyClient } from "../../../bot"

export const channelset = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    if(!bot.isOwner(interaction.user.id)) {
        return new EmbedBuilder().setTitle("You must be a bot owner to run this command!");
    }
    await bot.db.levelsys.upsert({where: {guild: interaction.guild.id}, update: {channel: interaction.options.getChannel('channel').id}, create: {guild: interaction.guild.id, channel: interaction.options.getChannel('channel').id}});
    const embed = new EmbedBuilder()
        .setTitle("Channel Set");

    return embed;
}