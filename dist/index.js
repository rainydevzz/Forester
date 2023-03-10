"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
dotenv_1.default.config();
new bot_1.MyClient({
    intents: ["Guilds", "GuildMembers", "GuildMessages"],
    partials: [
        discord_js_1.Partials.User,
        discord_js_1.Partials.GuildMember
    ]
})
    .collectEvents()
    .handleEvents()
    .login(process.env.TOKEN);
