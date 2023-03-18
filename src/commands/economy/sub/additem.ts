import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { MyClient } from "../../../bot";

export const additem = async (interaction: ChatInputCommandInteraction, bot: MyClient) => {
    const name = interaction.options.getString('name');
    const price = interaction.options.getInteger('price');
    const quantity = interaction.options.getInteger('quantity');

    if(!bot.isOwner(interaction.user.id)) {
        return new EmbedBuilder().setTitle("You must be a bot owner to run this command!");
    }

    await bot.addItem(name, quantity, price);

    const embed = new EmbedBuilder()
        .setTitle("Added Item")
        .setFields(
            {
                name: 'Name',
                value: `${name}`
            },
            {
                name: 'Price',
                value: `${price}`
            },
            {
                name: 'Quantity',
                value: `${quantity}`
            }
        );

    return embed;
}