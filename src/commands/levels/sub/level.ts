import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js"
import { MyClient } from "../../../bot"

export const level = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    await bot.upsertLevel(interaction.user.id, interaction.guild.id);
    const res = await bot.db.levels.findMany({where: {guild: interaction.guildId}, orderBy: [{level: 'desc'}]});
    const lvl = res.find(u => u.user == interaction.user.id);
    const pos = res.indexOf(lvl) + 1;

    const embed = new EmbedBuilder()
        .setTitle(`Level info for ${interaction.user.tag}`)
        .setFields(
            {
                name: 'Level',
                value: `${lvl.level}`
            },
            {
                name: 'Rank (Guild)',
                value: `${pos}`
            },
            {
                name: 'XP',
                value: `${lvl.xp}`
            }
        )
        .setThumbnail(interaction.user.avatarURL({extension: 'png'}));

    return embed;
}