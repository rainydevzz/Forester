import { MyClient } from "./bot";
import dotenv from 'dotenv';
import { Partials } from "discord.js";

dotenv.config();

new MyClient({
    intents: ["Guilds", "GuildMembers", "GuildMessages"],
    partials: [
        Partials.User,
        Partials.GuildMember
    ]
})
.collectEvents()
.handleEvents()
.login(process.env.TOKEN);