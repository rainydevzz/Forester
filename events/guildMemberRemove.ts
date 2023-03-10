import { GuildMember, EmbedBuilder, TextChannel } from "discord.js";
import { MyClient } from "../bot";
import { handleGreets } from "../handlers/greets";

export const name = 'guildMemberRemove';
export const run = async (member: GuildMember, bot: MyClient) => {
    await handleGreets(member, bot, 'goodbye');
}