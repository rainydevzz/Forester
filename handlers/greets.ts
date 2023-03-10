import { GuildMember, TextChannel, EmbedBuilder, ColorResolvable } from "discord.js";
import { MyClient } from "../bot";

export const handleGreets = async (member: GuildMember, bot: MyClient, mode: 'welcome' | 'goodbye') => {
    const res = await bot.db.greets.findFirst({
        where: {guild: member.guild.id}
    });

    if(!res) return;
    if(!res[`${mode}channel`] || !res[`${mode}content`]) return;

    const channel = bot.channels.cache.get(res[`${mode}channel`]) as TextChannel;
    let color: ColorResolvable;
    if(mode == 'goodbye') {
        color = "DarkRed";
    } else {
        color = "DarkGreen";
    }
    const embed = new EmbedBuilder()
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .setDescription(res[`${mode}content`])
        .setTimestamp(new Date())
        .setColor(color);

    await channel.send({embeds: [embed]});
}