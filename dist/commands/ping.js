"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'ping',
    description: 'pong',
    type: discord_js_1.ApplicationCommandType.ChatInput
};
const run = async (interaction) => {
    await interaction.followUp({ content: "pong!", ephemeral: true });
};
exports.run = run;
