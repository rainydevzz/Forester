import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js"
import { MyClient } from "../../../bot"

export const beg = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const cooldown = bot.getCooldown(interaction.user.id, 'beg', 1800000);
    if(!cooldown[0]) {
        const remainder = cooldown[1];
        const embed = new EmbedBuilder()
            .setTitle("Slow Down")
            .setDescription(`You must wait ${remainder} more minutes!`)
            .setColor("Red")
            .setTimestamp(new Date());

        return embed;
    }
    await bot.getBal(interaction.user);
    const add = Math.floor(Math.random() * 100);
    const bal = await bot.changeBal(interaction.user, add);

    const embed = new EmbedBuilder()
        .setTitle("You begged and received...")
        .setDescription(`${add} coins! your balance is now ${bal}`)
        .setColor("Random");

    return embed;
}