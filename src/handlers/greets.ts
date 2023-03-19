import { GuildMember, TextChannel, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import { MyClient } from "../bot";

export const handleGreets = async (member: GuildMember, bot: MyClient, mode: 'welcome' | 'goodbye') => {
    const res = await bot.db.greets.findFirst({
        where: {guild: member.guild.id}
    });

    if(!res) return;
    if(!res[`${mode}channel`] || !res[`${mode}content`]) return;

    const channel = bot.channels.cache.get(res[`${mode}channel`]) as TextChannel;
    let greetStr = res[`${mode}content`];

    await channel.send(`<@${member.id}> , ${greetStr}`);
}

export const greetsCommand = async (interaction: ChatInputCommandInteraction, bot: MyClient, mode: 'goodbye' | 'welcome') => {
    if(!bot.isOwner(interaction.user.id)) {
        return new EmbedBuilder().setTitle("You must be a bot owner to run this command!");
    }
    let data = {};
    data[`${mode}content`] = interaction.options.getString('content');
    data[`${mode}channel`] = interaction.options.getChannel('channel').id;
    let data2 = {guild: interaction.guildId};
    data2[`${mode}content`] = data[`${mode}content`];
    data2[`${mode}channel`] = data[`${mode}channel`];
    await bot.db.greets.upsert({
        where: {guild: interaction.guildId},
        update: data,
        create: data2
    });

    const embed = new EmbedBuilder()
        .setTitle("Setup Complete")
        .setDescription("Greeting message setup complete!")
        .addFields([
            {
                name: 'Channel',
                value: `<#${interaction.options.getChannel('channel').id}>`
            },
            {
                name: 'Content',
                value: interaction.options.getString('content')
            }
        ])
        .setColor("Green");

    return embed;
}