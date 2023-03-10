"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const discord_js_1 = require("discord.js");
exports.name = 'messageCreate';
const run = async (message) => {
    console.log(message.content);
    if (message.content.startsWith((0, discord_js_1.userMention)(message.client.user.id))) {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("Hello!")
            .setDescription("I see you have pinged me. Run /help or /about for more info!")
            .setColor("Green");
        if (message.channel.isTextBased()) {
            const channel = message.channel;
            await channel.send({ embeds: [embed] });
        }
    }
};
exports.run = run;
