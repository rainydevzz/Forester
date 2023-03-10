import { MyClient } from "../../../bot";
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export const goodbye = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    await bot.db.greets.upsert({
        where: {guild: interaction.guildId},
        update: {
            goodbyechannel: interaction.options.getChannel('channel').id,
            goodbyecontent: interaction.options.getString('content')
        },
        create: {
            guild: interaction.guildId,
            goodbyechannel: interaction.options.getChannel('channel').id,
            goodbyecontent: interaction.options.getString('content')
        }
    });
    const embed = new EmbedBuilder()
        .setTitle("Setup Complete")
        .setDescription("Goodbye message setup complete!")
        .addFields([
            {
                name: 'Channel',
                value: `<#${interaction.options.getChannel('channel').id}>`
            },
            {
                name: 'Content',
                value: interaction.options.getString('content')
            }
        ])
        .setColor("Green")

    return embed;
}