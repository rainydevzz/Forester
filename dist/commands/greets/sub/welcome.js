"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = void 0;
const discord_js_1 = require("discord.js");
const welcome = async (interaction, bot) => {
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
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Setup Complete")
        .setDescription("Welcome message setup complete!")
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
exports.welcome = welcome;
