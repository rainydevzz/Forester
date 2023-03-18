import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../../../bot";

export const shop = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const s = await bot.getShop();
    let str = ".\n";
    if(s[0]) {    
        for (const i of s) {
            str += `${i.name} - ${i.price} - ${i.quantity}\n`
        }
    }

    const embed = new EmbedBuilder()
        .setTitle("Shop")
        .setDescription(`Key: Name - Price - Quantity\n\n${str}`)
        .setColor("DarkGreen");

    return embed;
}