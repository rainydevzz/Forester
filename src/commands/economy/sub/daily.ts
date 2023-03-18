import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../../../bot";

export const daily = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const cooldown = bot.getCooldown(interaction.user.id, 'daily', 86400 * 1000);
    if(!cooldown[0]) {
        const remainder = cooldown[1];
        const embed = new EmbedBuilder()
            .setTitle("Slow Down")
            .setDescription(`You must wait ${remainder} more minutes!`)
            .setColor("Red")
            .setTimestamp(new Date());

        return embed;
    }
    await bot.changeBal(interaction.user, 500);
    const embed = new EmbedBuilder()
        .setTitle("Daily Received!")
        .setDescription("You got your 500 coins!")
        .setTimestamp(new Date())
        .setColor("Random");

    return embed;
}