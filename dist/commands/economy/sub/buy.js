"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buy = void 0;
const discord_js_1 = require("discord.js");
const buy = async (interaction, bot) => {
    const item = interaction.options.getString('name');
    const res = await bot.buy(interaction.user, item);
    switch (res[0]) {
        case 'success': {
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle("Success")
                .setDescription(`You bought ${item} successfully! your balance is now ${await bot.getBal(interaction.user)}`)
                .setTimestamp(new Date());
            return embed;
        }
        case 'balance': {
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle("Not enough money!")
                .setDescription(`you need ${res[1]} to buy this item, however you only have ${res[2]}.`)
                .setColor("DarkRed")
                .setTimestamp(new Date());
            return embed;
        }
        case 'item': {
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle("Item not found!")
                .setColor("DarkRed")
                .setTimestamp(new Date());
            return embed;
        }
        case 'quantity': {
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle("Out of Stock")
                .setDescription("You cannot buy that item as there are none left!")
                .setTimestamp(new Date());
            return embed;
        }
    }
};
exports.buy = buy;
