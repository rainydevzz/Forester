"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = exports.deleteTag = exports.create = void 0;
const discord_js_1 = require("discord.js");
const create = async (interaction, bot) => {
    await bot.db.tags.create({ data: {
            guild: interaction.guildId,
            name: interaction.options.getString('name'),
            content: interaction.options.getString('content'),
            id: bot.genString()
        } });
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Tag Created!")
        .setFields({
        name: 'Name',
        value: interaction.options.getString('name')
    })
        .setColor("DarkGreen")
        .setTimestamp(new Date());
    return embed;
};
exports.create = create;
const deleteTag = async (interaction, bot) => {
    await bot.db.tags.deleteMany({ where: { AND: {
                guild: interaction.guildId,
                name: interaction.options.getString('name')
            } } });
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Tag Deleted!")
        .setTimestamp(new Date())
        .setColor("DarkGreen");
    return embed;
};
exports.deleteTag = deleteTag;
const view = async (interaction, bot) => {
    const res = await bot.db.tags.findFirst({ where: { AND: {
                guild: interaction.guildId,
                name: interaction.options.getString('name')
            } } });
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(res.name)
        .setDescription(res.content)
        .setColor("Random")
        .setTimestamp(new Date());
    return embed;
};
exports.view = view;
