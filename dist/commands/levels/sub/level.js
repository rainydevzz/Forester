"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.level = void 0;
const discord_js_1 = require("discord.js");
const level = async (interaction, bot) => {
    await bot.upsertLevel(interaction.user.id, interaction.guild.id);
    const res = await bot.db.levels.findMany({ where: { guild: interaction.guildId }, orderBy: [{ level: 'desc' }] });
    const lvl = res.find(u => u.user == interaction.user.id);
    const pos = res.indexOf(lvl) + 1;
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`Level info for ${interaction.user.tag}`)
        .setFields({
        name: 'Level',
        value: `${lvl.level}`
    }, {
        name: 'Rank (Guild)',
        value: `${pos}`
    }, {
        name: 'XP',
        value: `${lvl.xp}`
    })
        .setThumbnail(interaction.user.avatarURL({ extension: 'png' }));
    return embed;
};
exports.level = level;
