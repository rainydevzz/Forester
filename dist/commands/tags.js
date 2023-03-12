"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.command = void 0;
const discord_js_1 = require("discord.js");
const tags_1 = require("../handlers/tags");
exports.command = {
    name: 'tags',
    description: 'tags cmds',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'create',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            description: 'create a tag',
            options: [
                {
                    name: 'name',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    description: 'name of the tag',
                    required: true
                },
                {
                    name: 'content',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    description: 'content of the tag',
                    required: true
                }
            ]
        },
        {
            name: 'delete',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            description: 'delete a tag',
            options: [
                {
                    name: 'name',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    description: 'name of the tag',
                    required: true
                }
            ]
        },
        {
            name: 'view',
            description: 'view a tag!',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'tag name',
                    autocomplete: true,
                    type: discord_js_1.ApplicationCommandOptionType.String
                }
            ]
        }
    ]
};
const run = async (interaction, bot) => {
    const sub = interaction.options.getSubcommand();
    let data;
    switch (sub) {
        case 'create': {
            data = await (0, tags_1.create)(interaction, bot);
            break;
        }
        case 'delete': {
            data = await (0, tags_1.deleteTag)(interaction, bot);
            break;
        }
        case 'view': {
            data = await (0, tags_1.view)(interaction, bot);
            break;
        }
    }
    await interaction.followUp({ embeds: [data] });
};
exports.run = run;
