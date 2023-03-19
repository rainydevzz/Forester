import { BaseInteraction, EmbedBuilder } from "discord.js";
import { logger } from "../utils/logger";
import { MyClient } from "../bot";

export const name = 'interactionCreate';
export const run = async (interaction: BaseInteraction, bot: MyClient) => {
    if(interaction.isChatInputCommand()) {
        try {
            await interaction.deferReply();
            await bot.commands.get(interaction.commandName)(interaction, bot);
        } catch(err) {
            const embed = new EmbedBuilder()
                .setTitle("Uh Oh, Error!")
                .setDescription(`\`\`\`\n${err}\`\`\``)
                .setColor("Red");
            logger.error({ERROR: err});
            await interaction.followUp({embeds: [embed]});
        }
    }

    if(interaction.isContextMenuCommand()) {
        await bot.commands.get(interaction.commandName)(interaction);
    }

    if(interaction.isButton()) {
        await bot.components.get(interaction.customId)(interaction, bot);
    }

    if(interaction.isAutocomplete()) {
        await interaction.respond(await bot.autocompleteTags(interaction));
    }
}