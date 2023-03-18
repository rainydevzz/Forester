"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.command = void 0;
const discord_js_1 = require("discord.js");
const additem_1 = require("./sub/additem");
const admingive_1 = require("./sub/admingive");
const balance_1 = require("./sub/balance");
const beg_1 = require("./sub/beg");
const buy_1 = require("./sub/buy");
const inventory_1 = require("./sub/inventory");
const shop_1 = require("./sub/shop");
exports.command = {
    name: 'economy',
    description: 'economy commands',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'buy',
            description: 'buy an item',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'item name',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'beg',
            description: 'beg for money',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'admingive',
            description: 'give money to a user; bot admins only.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'user to give money to',
                    type: discord_js_1.ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'amount',
                    description: 'amount of money to give',
                    type: discord_js_1.ApplicationCommandOptionType.Integer,
                    required: true
                }
            ]
        },
        {
            name: 'balance',
            description: 'see your balance',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'shop',
            description: 'see the shop',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'inventory',
            description: 'see your inventory!',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'additem',
            description: 'add an item!',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'name of the item',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'price',
                    description: 'price of the item',
                    type: discord_js_1.ApplicationCommandOptionType.Integer,
                    required: true
                },
                {
                    name: 'quantity',
                    description: 'quantity of the item',
                    type: discord_js_1.ApplicationCommandOptionType.Integer,
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
        case 'beg': {
            data = await (0, beg_1.beg)(interaction, bot);
            break;
        }
        case 'buy': {
            data = await (0, buy_1.buy)(interaction, bot);
            break;
        }
        case 'admingive': {
            data = await (0, admingive_1.admingive)(interaction, bot);
            break;
        }
        case 'balance': {
            data = await (0, balance_1.balance)(interaction, bot);
            break;
        }
        case 'shop': {
            data = await (0, shop_1.shop)(interaction, bot);
            break;
        }
        case 'inventory': {
            data = await (0, inventory_1.inventory)(interaction, bot);
            break;
        }
        case 'additem': {
            data = await (0, additem_1.additem)(interaction, bot);
            break;
        }
    }
    await interaction.followUp({ embeds: [data] });
};
exports.run = run;
