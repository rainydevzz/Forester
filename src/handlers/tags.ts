import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js"
import { MyClient } from "../bot"

export const create = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    await bot.db.tags.create({data: {
        guild: interaction.guildId,
        name: interaction.options.getString('name'),
        content: interaction.options.getString('content'),
        id: bot.genString()
    }});

    const embed = new EmbedBuilder()
        .setTitle("Tag Created!")
        .setFields(
            {
                name: 'Name',
                value: interaction.options.getString('name')
            }
        )
        .setColor("DarkGreen")
        .setTimestamp(new Date());

    return embed;
}

export const deleteTag = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    await bot.db.tags.deleteMany({where: {AND: {
        guild: interaction.guildId,
        name: interaction.options.getString('name')
    }}});

    const embed = new EmbedBuilder()
        .setTitle("Tag Deleted!")
        .setTimestamp(new Date())
        .setColor("DarkGreen");

    return embed;
}

export const view = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const res = await bot.db.tags.findFirst({where: {AND: {
        guild: interaction.guildId,
        name: interaction.options.getString('name')
    }}});

    const embed = new EmbedBuilder()
        .setTitle(res.name)
        .setDescription(res.content)
        .setColor("Random")
        .setTimestamp(new Date());

    return embed;
}