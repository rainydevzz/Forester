import { GuildMember, EmbedBuilder, TextChannel } from "discord.js";
import { MyClient } from "../bot";

export const name = 'guildMemberAdd';
export const run = async (member: GuildMember, bot: MyClient) => {
    const res = await bot.db.greets.findFirst({
        where: {guild: member.guild.id}
    });

    if(!res) return;
    if(!res.welcomechannel || !res.welcomecontent) return;

    const channel = bot.channels.cache.get(res.welcomechannel) as TextChannel;
    const embed = new EmbedBuilder()
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .setDescription(res.welcomecontent)
        .setTimestamp(new Date())
        .setColor("DarkGreen");

    await channel.send({embeds: [embed]});
}