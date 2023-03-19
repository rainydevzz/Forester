"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelset = void 0;
const builders_1 = require("@discordjs/builders");
const channelset = async (interaction, bot) => {
    if (!bot.isOwner(interaction.user.id)) {
        return new builders_1.EmbedBuilder().setTitle("You must be a bot owner to run this command!");
    }
    await bot.db.levelsys.upsert({ where: { guild: interaction.guild.id }, update: { channel: interaction.options.getChannel('channel').id }, create: { guild: interaction.guild.id, channel: interaction.options.getChannel('channel').id } });
    const embed = new builders_1.EmbedBuilder()
        .setTitle("Channel Set");
    return embed;
};
exports.channelset = channelset;
