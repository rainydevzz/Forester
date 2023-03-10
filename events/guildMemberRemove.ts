import { GuildMember, EmbedBuilder, TextChannel } from "discord.js";
import { MyClient } from "../bot";

export const name = 'guildMemberRemove';
export const run = async (member: GuildMember, bot: MyClient) => {
    const res = await bot.db.greets.findFirst({
        where: {guild: member.guild.id}
    });

    if(!res) return;
    if(!res.goodbyechannel || !res.goodbyecontent) return;

    const channel = bot.channels.cache.get(res.goodbyechannel) as TextChannel;
    const embed = new EmbedBuilder()
        .setTitle(`Goodbye ${member.user.tag}!`)
        .setDescription(res.goodbyecontent)
        .setTimestamp(new Date())
        .setColor("DarkRed");

    await channel.send({embeds: [embed]});
}