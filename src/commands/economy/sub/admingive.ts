import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../../../bot";

export const admingive = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const user = interaction.options.getUser('user');
    const amt = interaction.options.getInteger('amount');

    if(!bot.isOwner(interaction.user.id)) {
        return new EmbedBuilder().setTitle("You must be a bot owner to run this command!");
    }

    await bot.changeBal(user, amt);

    const embed = new EmbedBuilder()
        .setTitle("Success!")
        .setDescription(`You have transferred ${amt} to ${user.tag}`)
        .setColor("DarkGreen");

    return embed;
}