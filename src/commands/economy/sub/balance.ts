import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js"
import { MyClient } from "../../../bot"

export const balance = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const bal = await bot.getBal(interaction.user);
    const embed = new EmbedBuilder()
        .setTitle(`Balance of ${interaction.user.tag}`)
        .setFields(
            {
                name: 'Balance',
                value: `${bal}`
            }
        )
        .setColor("Aqua")
        .setThumbnail(interaction.user.defaultAvatarURL);

    return embed;
}