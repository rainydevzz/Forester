import { EmbedBuilder, Message, TextChannel, userMention } from "discord.js";
import { MyClient } from "../bot";

export const name = 'messageCreate';
export const run = async (message: Message, bot: MyClient) => {
    if(message.author.bot) return;
    bot.addMessage(message.id, message.author.id, message.guild.id);
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