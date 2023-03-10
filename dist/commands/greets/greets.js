"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.command = void 0;
const discord_js_1 = require("discord.js");
const greets_1 = require("../../handlers/greets");
exports.command = {
    name: 'greets',
    description: 'greet message commands',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'welcome',
            description: 'welcome channel details',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'channel to set',
                    type: discord_js_1.ApplicationCommandOptionType.Channel,
                    channelTypes: [discord_js_1.ChannelType.GuildText],
                    required: true
                },
                {
                    name: 'content',
                    description: 'content of the message',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'goodbye',
            description: 'goodbye channel details',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'channel to set',
                    type: discord_js_1.ApplicationCommandOptionType.Channel,
                    channelTypes: [discord_js_1.ChannelType.GuildText],
                    required: true
                },
                {
                    name: 'content',
                    description: 'content of the message',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ]
};
const run = async (interaction, bot) => {
    const sub = interaction.options.getSubcommand();
    let data;
    switch (sub) {
        case 'welcome': {
            data = await (0, greets_1.greetsCommand)(interaction, bot, 'welcome');
            break;
        }
        case 'goodbye': {
            data = await (0, greets_1.greetsCommand)(interaction, bot, 'goodbye');
            break;
        }
    }
    await interaction.followUp({ embeds: [data] });
};
exports.run = run;
