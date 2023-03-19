import { ChatInputCommandInteraction } from "discord.js";
import { MyClient } from "../../../bot";

export const leaderboard = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const users = await bot.getTotalXP(interaction.guildId);
    const embed = bot.doLevelLB(users);
    return embed;
}