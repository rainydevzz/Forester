"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
const discord_js_1 = require("discord.js");
const inventory = async (interaction, bot) => {
    const inv = await bot.getInv(interaction.user, 'guh', true);
    let str = ".\n";
    if (inv[0]) {
        for (const i of inv) {
            str += `${i.name} - ${i.quantity}`;
        }
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Inventory")
        .setDescription(str);
    return embed;
};
exports.inventory = inventory;
