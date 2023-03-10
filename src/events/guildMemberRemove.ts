import { GuildMember } from "discord.js";
import { logger } from "../utils/logger";
import { MyClient } from "../bot";
import { handleGreets } from "../handlers/greets";

export const name = 'guildMemberRemove';
export const run = async (member: GuildMember, bot: MyClient) => {
    logger.info({memberRemove: `${member.user.tag} has left.`});
    await handleGreets(member, bot, 'goodbye');
}