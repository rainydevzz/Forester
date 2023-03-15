"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const logger_1 = require("./utils/logger");
dotenv_1.default.config();
process.on('uncaughtException', (err) => { logger_1.logger.error({ ERROR: err }); });
new bot_1.MyClient({
    intents: ["Guilds", "GuildMembers", "GuildMessages"],
    partials: [
        discord_js_1.Partials.User,
        discord_js_1.Partials.GuildMember
    ]
})
    .collectEvents()
    .collectComponents()
    .handleEvents()
    .login(process.env.TOKEN);
