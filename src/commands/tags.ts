import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../bot";
import { create, deleteTag, view } from "../handlers/tags";

export const command: ApplicationCommandData = {
    name: 'tags',
    description: 'tags cmds',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'create',
            type: ApplicationCommandOptionType.Subcommand,
            description: 'create a tag',
            options: [
                {
                    name: 'name',
                    type: ApplicationCommandOptionType.String,
                    description: 'name of the tag',
                    required: true
                },
                {
                    name: 'content',
                    type: ApplicationCommandOptionType.String,
                    description: 'content of the tag',
                    required: true
                }
            ]
        },
        {
            name: 'delete',
            type: ApplicationCommandOptionType.Subcommand,
            description: 'delete a tag',
            options: [
                {
                    name: 'name',
                    type: ApplicationCommandOptionType.String,
                    description: 'name of the tag',
                    required: true
                }
            ]
        },
        {
            name: 'view',
            description: 'view a tag!',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'tag name',
                    autocomplete: true,
                    type: ApplicationCommandOptionType.String
                }
            ]
        }
    ]
}

export const run = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const sub = interaction.options.getSubcommand();
    let data: EmbedBuilder;

    switch(sub) {
        case 'create': {
            data = await create(interaction, bot);
            break;
        }

        case 'delete': {
            data = await deleteTag(interaction, bot);
            break;
        }

        case 'view': {
            data = await view(interaction, bot);
            break;
        }
    }

    await interaction.followUp({embeds: [data]});
}