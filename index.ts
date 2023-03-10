import { MyClient } from "./bot";
import dotenv from 'dotenv';
import { Message, Partials, Sweepers } from "discord.js";

dotenv.config();

const bot = new MyClient({
    intents: ["Guilds", "GuildMembers"],
    partials: [
        Partials.User,
        Partials.GuildMember
    ]
});

bot.collectCommands();
bot.collectEvents();
bot.handleEvents();
bot.login(process.env.TOKEN);