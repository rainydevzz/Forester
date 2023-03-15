import { MyClient } from "./bot";
import dotenv from 'dotenv';
import { Partials } from "discord.js";
import { logger } from "./utils/logger";

dotenv.config();

process.on('uncaughtException', (err) => {logger.error({ERROR: err})});

new MyClient({
    intents: ["Guilds", "GuildMembers", "GuildMessages"],
    partials: [
        Partials.User,
        Partials.GuildMember
    ]
})
.collectEvents()
.collectComponents()
.handleEvents()
.login(process.env.TOKEN);