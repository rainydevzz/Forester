import { GuildMember } from "discord.js";
import { logger } from "../utils/logger";
import { MyClient } from "../bot";
import { handleGreets } from "../handlers/greets";

export const name = 'guildMemberAdd';
export const run = async (member: GuildMember, bot: MyClient) => {
    logger.info({MEMBER_ADD: `${member.user.tag} has joined.`});
    await handleGreets(member, bot, 'welcome');
}