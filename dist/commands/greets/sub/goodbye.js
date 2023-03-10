"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goodbye = void 0;
const discord_js_1 = require("discord.js");
const goodbye = async (interaction, bot) => {
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
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Setup Complete")
        .setDescription("Goodbye message setup complete!")
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
exports.goodbye = goodbye;
