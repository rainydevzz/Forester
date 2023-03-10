import { MyClient } from "./bot";
import dotenv from 'dotenv';
import { Partials } from "discord.js";

dotenv.config();

new MyClient({
    intents: ["Guilds", "GuildMembers"],
    partials: [
        Partials.User,
        Partials.GuildMember
    ]
})
.collectCommands()[1]
.collectEvents()
.handleEvents()
.login(process.env.TOKEN);