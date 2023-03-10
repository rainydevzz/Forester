"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greetsCommand = exports.handleGreets = void 0;
const discord_js_1 = require("discord.js");
const handleGreets = async (member, bot, mode) => {
    const res = await bot.db.greets.findFirst({
        where: { guild: member.guild.id }
    });
    if (!res)
        return;
    if (!res[`${mode}channel`] || !res[`${mode}content`])
        return;
    const channel = bot.channels.cache.get(res[`${mode}channel`]);
    let color;
    if (mode == 'goodbye') {
        color = "DarkRed";
    }
    else {
        color = "DarkGreen";
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`Goodbye, ${member.guild.name}, ${member.user.tag}`)
        .setDescription(res[`${mode}content`])
        .setTimestamp(new Date())
        .setColor(color)
        .setThumbnail(`${member.avatarURL()}`);
    await channel.send({ embeds: [embed] });
};
exports.handleGreets = handleGreets;
const greetsCommand = async (interaction, bot, mode) => {
    let data = {};
    data[`${mode}content`] = interaction.options.getString('content');
    data[`${mode}channel`] = interaction.options.getChannel('channel').id;
    let data2 = { guild: interaction.guildId };
    data2[`${mode}content`] = data[`${mode}content`];
    data2[`${mode}channel`] = data[`${mode}channel`];
    await bot.db.greets.upsert({
        where: { guild: interaction.guildId },
        update: data,
        create: data2
    });
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Setup Complete")
        .setDescription("Greeting message setup complete!")
        .addFields([
        {
            name: 'Channel',
            value: `<#${interaction.options.getChannel('channel').id}>`
        },
        {
            name: 'Content',
            value: interaction.options.getString('content')
        }
    ])
        .setColor("Green");
    return embed;
};
exports.greetsCommand = greetsCommand;
