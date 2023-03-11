import { 
    ChatInputCommandInteraction, 
    ApplicationCommandType, 
    ApplicationCommandData, 
    ApplicationCommandOptionType, 
    ChannelType, 
    ActionRowBuilder, 
    ButtonBuilder, 
    TextChannel, 
    EmbedBuilder, 
    ButtonStyle } from "discord.js";
import { MyClient } from "../bot";

export const command: ApplicationCommandData = {
    name: 'confessions',
    description: 'set up confession panel',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'panel_channel',
            type: ApplicationCommandOptionType.Channel,
            channel_types: [ChannelType.GuildText],
            description: 'channel to place panel',
            required: true
        },
        {
            name: 'confess_channel',
            type: ApplicationCommandOptionType.Channel,
            channel_types: [ChannelType.GuildText],
            description: 'channel to send confessions',
            required: true
        }
    ]
}

const confessButton = new ButtonBuilder()
    .setLabel("Confess")
    .setCustomId("confess-btn")
    .setStyle(ButtonStyle.Success);

const view = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(confessButton);

export const run = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const channel = interaction.options.getChannel('confess_channel') as TextChannel;
    await bot.db.confession.upsert({
        where: {guild: interaction.guildId},
        create: {
            guild: interaction.guildId,
            channel: channel.id
        },
        update: {
            channel: channel.id
        }
    });
    await interaction.followUp({content: "panel sent!", ephemeral: true});
    const embed = new EmbedBuilder()
        .setTitle("Confess Here!")
        .setDescription("Make a private confession here!")
        .setTimestamp(new Date())
        .setColor("Green");
        
    const panelChannel = interaction.options.getChannel('panel_channel') as TextChannel;
    await panelChannel.send({embeds: [embed], components: [view]});
}