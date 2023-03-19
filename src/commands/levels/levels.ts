import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChannelType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../../bot";
import { channelset } from "./sub/channelset";
import { level } from "./sub/level";

export const command: ApplicationCommandData = {
    name: 'levels',
    description: 'levels commands',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'channelset',
            description: 'set a channel',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'channel to use',
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText]
                }
            ]
        },
        {
            name: 'level',
            description: 'see your level',
            type: ApplicationCommandOptionType.Subcommand
        }
    ]
}

export const run = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const sub = interaction.options.getSubcommand();
    let data: EmbedBuilder;

    switch(sub) {
        case 'channelset': { data = await channelset(interaction, bot); break; }
        
        case 'level': { data = await level(interaction, bot); break; }
    }

    await interaction.followUp({embeds: [data]});
}