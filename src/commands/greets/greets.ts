import { ApplicationCommandData, ChatInputCommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, ChannelType, EmbedBuilder } from "discord.js";
import { MyClient } from "../../bot";
import { greetsCommand } from "../../handlers/greets";

export const command: ApplicationCommandData = {
    name: 'greets',
    description: 'greet message commands',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'welcome',
            description: 'welcome channel details',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'channel to set',
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                },
                {
                    name: 'content',
                    description: 'content of the message',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'goodbye',
            description: 'goodbye channel details',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'channel to set',
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                },
                {
                    name: 'content',
                    description: 'content of the message',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ]
}

export const run = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const sub = interaction.options.getSubcommand();
    let data: EmbedBuilder;

    switch(sub) {
        case 'welcome': {
            data = await greetsCommand(interaction, bot, 'welcome');
            break;
        }
        case 'goodbye': {
            data = await greetsCommand(interaction, bot, 'goodbye');
            break;
        }
    }


    await interaction.followUp({embeds: [data]});
}