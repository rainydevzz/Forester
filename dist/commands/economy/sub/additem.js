"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.additem = void 0;
const discord_js_1 = require("discord.js");
const additem = async (interaction, bot) => {
    const name = interaction.options.getString('name');
    const price = interaction.options.getInteger('price');
    const quantity = interaction.options.getInteger('quantity');
    if (!bot.isOwner(interaction.user.id)) {
        return new discord_js_1.EmbedBuilder().setTitle("You must be a bot owner to run this command!");
    }
    await bot.addItem(name, quantity, price);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Added Item")
        .setFields({
        name: 'Name',
        value: `${name}`
    }, {
        name: 'Price',
        value: `${price}`
    }, {
        name: 'Quantity',
        value: `${quantity}`
    });
    return embed;
};
exports.additem = additem;
