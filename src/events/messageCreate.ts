import { EmbedBuilder, Message, TextChannel, userMention } from "discord.js";

export const name = 'messageCreate';
export const run = async (message: Message) => {
    if(message.content.startsWith(userMention(message.client.user.id))) {
        const embed = new EmbedBuilder()
            .setTitle("Hello!")
            .setDescription("I see you have pinged me. Run /help or /about for more info!")
            .setColor("Green");

        if(message.channel.isTextBased()) {
            const channel = message.channel as TextChannel;
            await channel.send({embeds: [embed]});
        }
    }
}