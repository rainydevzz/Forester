"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'confessions',
    description: 'set up confession panel',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["ManageGuild"],
    options: [
        {
            name: 'panel_channel',
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            channel_types: [discord_js_1.ChannelType.GuildText],
            description: 'channel to place panel',
            required: true
        },
        {
            name: 'confess_channel',
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            channel_types: [discord_js_1.ChannelType.GuildText],
            description: 'channel to send confessions',
            required: true
        }
    ]
};
const confessButton = new discord_js_1.ButtonBuilder()
    .setLabel("Confess")
    .setCustomId("confess-btn")
    .setStyle(discord_js_1.ButtonStyle.Success);
const view = new discord_js_1.ActionRowBuilder()
    .addComponents(confessButton);
const run = async (interaction, bot) => {
    const channel = interaction.options.getChannel('confess_channel');
    await bot.db.confession.upsert({
        where: { guild: interaction.guildId },
        create: {
            guild: interaction.guildId,
            channel: channel.id
        },
        update: {
            channel: channel.id
        }
    });
    await interaction.followUp({ content: "panel sent!", ephemeral: true });
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Confess Here!")
        .setDescription("Make a private confession here!")
        .setTimestamp(new Date())
        .setColor("Green");
    const panelChannel = interaction.options.getChannel('panel_channel');
    await panelChannel.send({ embeds: [embed], components: [view] });
};
exports.run = run;
