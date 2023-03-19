"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.command = void 0;
const discord_js_1 = require("discord.js");
const channelset_1 = require("./sub/channelset");
const leaderboard_1 = require("./sub/leaderboard");
const level_1 = require("./sub/level");
exports.command = {
    name: 'levels',
    description: 'levels commands',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'channelset',
            description: 'set a channel',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'channel to use',
                    type: discord_js_1.ApplicationCommandOptionType.Channel,
                    channelTypes: [discord_js_1.ChannelType.GuildText]
                }
            ]
        },
        {
            name: 'level',
            description: 'see your level',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'leaderboard',
            description: 'leaderboard command',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        }
    ]
};
const run = async (interaction, bot) => {
    const sub = interaction.options.getSubcommand();
    let data;
    switch (sub) {
        case 'channelset': {
            data = await (0, channelset_1.channelset)(interaction, bot);
            break;
        }
        case 'level': {
            data = await (0, level_1.level)(interaction, bot);
            break;
        }
        case 'leaderboard': {
            data = await (0, leaderboard_1.leaderboard)(interaction, bot);
            break;
        }
    }
    await interaction.followUp({ embeds: [data] });
};
exports.run = run;
