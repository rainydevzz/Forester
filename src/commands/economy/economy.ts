import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../../bot";
import { additem } from "./sub/additem";
import { admingive } from "./sub/admingive";
import { balance } from "./sub/balance";
import { beg } from "./sub/beg";
import { buy } from "./sub/buy";
import { inventory } from "./sub/inventory";
import { shop } from "./sub/shop";

export const command: ApplicationCommandData = {
    name: 'economy',
    description: 'economy commands',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'buy',
            description: 'buy an item',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'item name',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'beg',
            description: 'beg for money',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'admingive',
            description: 'give money to a user; bot admins only.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'user to give money to',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'amount',
                    description: 'amount of money to give',
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                }
            ]
        },
        {
            name: 'balance',
            description: 'see your balance',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'shop',
            description: 'see the shop',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'inventory',
            description: 'see your inventory!',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'additem',
            description: 'add an item!',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'name of the item',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'price',
                    description: 'price of the item',
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                },
                {
                    name: 'quantity',
                    description: 'quantity of the item',
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                }
            ]
        }
    ]
}

export const run = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const sub = interaction.options.getSubcommand();
    let data: EmbedBuilder;

    switch(sub) {
        case 'beg': { data = await beg(interaction, bot); break; }

        case 'buy': { data = await buy(interaction, bot); break; }

        case 'admingive': { data = await admingive(interaction, bot); break; }

        case 'balance': { data = await balance(interaction, bot); break; }

        case 'shop': { data = await shop(interaction, bot); break; }

        case 'inventory': { data = await inventory(interaction, bot); break; }

        case 'additem': { data = await additem(interaction, bot); break; }
    }

    await interaction.followUp({embeds: [data]});
}