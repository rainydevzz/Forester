import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../../../bot";

export const inventory = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const inv = await bot.getInv(interaction.user, 'guh', true);

    let str = ".\n";
    if(inv[0]) {
        for(const i of inv) {
            str += `${i.name} - ${i.quantity}`;
        }
    }

    const embed = new EmbedBuilder()
        .setTitle("Inventory")
        .setDescription(str);

    return embed;
}