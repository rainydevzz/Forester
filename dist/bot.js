"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClient = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const logger_1 = require("./utils/logger");
class MyClient extends discord_js_1.Client {
    commands = new Map();
    events;
    db = new client_1.PrismaClient();
    async syncCommands() {
        await this.application?.commands.set(this.collectCommands()[0]);
        logger_1.logger.info({ COMMANDS: `Synced All Commands!` });
    }
    collectCommands() {
        let cmds = [];
        const dir = path_1.default.join(__dirname, 'commands');
        const commandsDir = (0, fs_1.readdirSync)(dir);
        for (const f of commandsDir) {
            const isDir = (0, fs_1.lstatSync)(path_1.default.join(dir, f));
            if (isDir.isDirectory()) {
                const sdir = path_1.default.join(dir, f);
                const subDir = (0, fs_1.readdirSync)(sdir);
                for (const sf of subDir) {
                    if ((0, fs_1.lstatSync)(path_1.default.join(sdir, sf)).isDirectory())
                        continue;
                    const { command, run } = require(path_1.default.join(sdir, sf));
                    cmds.push(command);
                    this.commands.set(command.name, run);
                }
            }
            else {
                const { command, run } = require(path_1.default.join(dir, f));
                cmds.push(command);
                this.commands.set(command.name, run);
            }
        }
        return [cmds, this];
    }
    collectEvents() {
        let eventList = [];
        const dir = path_1.default.join(__dirname, 'events');
        const eventDir = (0, fs_1.readdirSync)(path_1.default.join(__dirname, 'events'));
        for (const e of eventDir) {
            const data = require(path_1.default.join(dir, e));
            eventList.push({ name: data.name, run: data.run });
        }
        this.events = eventList;
        logger_1.logger.info({ EVENTS: "Collected All Events!" });
        return this;
    }
    handleEvents() {
        for (const e of this.events) {
            this.on(e.name, (...args) => e.run(...args, this));
        }
        return this;
    }
    isOwner(id) {
        const owners = process.env.OWNERS.split(' ');
        return owners.includes(id);
    }
    debug() {
        console.log(this.events);
        console.log(this.commands);
    }
}
exports.MyClient = MyClient;
