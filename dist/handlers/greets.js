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
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .setDescription(res[`${mode}content`])
        .setTimestamp(new Date())
        .setColor(color);
    await channel.send({ embeds: [embed] });
};
exports.handleGreets = handleGreets;
const greetsCommand = async (interaction, bot, mode) => {
    if (mode == 'goodbye') {
        await bot.db.greets.upsert({
            where: { guild: interaction.guildId },
            update: {
                goodbyechannel: interaction.options.getChannel('channel').id,
                goodbyecontent: interaction.options.getString('content')
            },
            create: {
                guild: interaction.guildId,
                goodbyechannel: interaction.options.getChannel('channel').id,
                goodbyecontent: interaction.options.getString('content')
            }
        });
    }
    else {
        await bot.db.greets.upsert({
            where: { guild: interaction.guildId },
            update: {
                welcomechannel: interaction.options.getChannel('channel').id,
                welcomecontent: interaction.options.getString('content')
            },
            create: {
                guild: interaction.guildId,
                welcomechannel: interaction.options.getChannel('channel').id,
                welcomecontent: interaction.options.getString('content')
            }
        });
    }
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
