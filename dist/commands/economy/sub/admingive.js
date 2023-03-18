"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admingive = void 0;
const discord_js_1 = require("discord.js");
const admingive = async (interaction, bot) => {
    const user = interaction.options.getUser('user');
    const amt = interaction.options.getInteger('amount');
    if (!bot.isOwner(interaction.user.id)) {
        return new discord_js_1.EmbedBuilder().setTitle("You must be a bot owner to run this command!");
    }
    await bot.changeBal(user, amt);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Success!")
        .setDescription(`You have transferred ${amt} to ${user.tag}`)
        .setColor("DarkGreen");
    return embed;
};
exports.admingive = admingive;
