"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const discord_js_1 = require("discord.js");
exports.name = 'guildMemberAdd';
const run = async (member, bot) => {
    const res = await bot.db.greets.findFirst({
        where: { guild: member.guild.id }
    });
    if (!res)
        return;
    if (!res.welcomechannel || !res.welcomecontent)
        return;
    const channel = bot.channels.cache.get(res.welcomechannel);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .setDescription(res.welcomecontent)
        .setTimestamp(new Date())
        .setColor("DarkGreen");
    await channel.send({ embeds: [embed] });
};
exports.run = run;
