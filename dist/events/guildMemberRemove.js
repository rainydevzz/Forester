"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const discord_js_1 = require("discord.js");
exports.name = 'guildMemberRemove';
const run = async (member, bot) => {
    const res = await bot.db.greets.findFirst({
        where: { guild: member.guild.id }
    });
    if (!res)
        return;
    if (!res.goodbyechannel || !res.goodbyecontent)
        return;
    const channel = bot.channels.cache.get(res.goodbyechannel);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`Goodbye ${member.user.tag}!`)
        .setDescription(res.goodbyecontent)
        .setTimestamp(new Date())
        .setColor("DarkRed");
    await channel.send({ embeds: [embed] });
};
exports.run = run;
