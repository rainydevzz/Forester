"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'Invite',
    type: discord_js_1.ApplicationCommandType.User
};
const run = async (interaction) => {
    await interaction.reply({ content: `Here's an invite to **Forestcord**\n${process.env.INVITE}`, ephemeral: true });
};
exports.run = run;
