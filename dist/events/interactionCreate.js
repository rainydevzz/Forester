"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const discord_js_1 = require("discord.js");
const logger_1 = require("../utils/logger");
exports.name = 'interactionCreate';
const run = async (interaction, bot) => {
    if (interaction.isChatInputCommand()) {
        try {
            await interaction.deferReply();
            await bot.commands.get(interaction.commandName)(interaction, bot);
        }
        catch (err) {
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle("Uh Oh, Error!")
                .setDescription(`\`\`\`\n${err}\`\`\``)
                .setColor("Red");
            logger_1.logger.error({ ERROR: err });
            await interaction.followUp({ embeds: [embed] });
        }
    }
    if (interaction.isContextMenuCommand()) {
        await bot.commands.get(interaction.commandName)(interaction);
    }
    if (interaction.isButton()) {
        await bot.components.get(interaction.customId)(interaction, bot);
    }
    if (interaction.isAutocomplete()) {
        await interaction.respond(await bot.autocompleteTags(interaction));
    }
};
exports.run = run;
