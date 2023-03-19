import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../../../bot";

export const leaderboard = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const cooldown = bot.getCooldown(interaction.user.id, 'leaderboard', 180000);
    if(!cooldown[0]) {
        const remainder = cooldown[1];
        const embed = new EmbedBuilder()
            .setTitle("Slow Down")
            .setDescription(`You must wait ${remainder} more minutes!`)
            .setColor("Red")
            .setTimestamp(new Date());

        return embed;
    }
    const users = await bot.getTotalXP(interaction.guildId);
    const embed = bot.doLevelLB(users, interaction.guildId);
    return embed;
}