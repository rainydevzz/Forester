"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shop = void 0;
const discord_js_1 = require("discord.js");
const shop = async (interaction, bot) => {
    const s = await bot.getShop();
    let str = ".\n";
    if (s[0]) {
        for (const i of s) {
            str += `${i.name} - ${i.price} - ${i.quantity}\n`;
        }
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Shop")
        .setDescription(`Key: Name - Price - Quantity\n\n${str}`)
        .setColor("DarkGreen");
    return embed;
};
exports.shop = shop;
