import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../../../bot";

export const buy = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const item = interaction.options.getString('name');
    const res = await bot.buy(interaction.user, item);
    switch(res[0]) {
        case 'success': {
            const embed = new EmbedBuilder()
                .setTitle("Success")
                .setDescription(`You bought ${item} successfully! your balance is now ${await bot.getBal(interaction.user)}`)
                .setTimestamp(new Date());

            return embed;
        }

        case 'balance': {
            const embed = new EmbedBuilder()
                .setTitle("Not enough money!")
                .setDescription(`you need ${res[1]} to buy this item, however you only have ${res[2]}.`)
                .setColor("DarkRed")
                .setTimestamp(new Date());

            return embed;
        }

        case 'item': {
            const embed = new EmbedBuilder()
                .setTitle("Item not found!")
                .setColor("DarkRed")
                .setTimestamp(new Date());

            return embed;
        }

        case 'quantity': {
            const embed = new EmbedBuilder()
                .setTitle("Out of Stock")
                .setDescription("You cannot buy that item as there are none left!")
                .setTimestamp(new Date());

            return embed;
        }
    }
}