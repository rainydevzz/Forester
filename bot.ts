import { ApplicationCommandData, Client } from 'discord.js';
import { readdirSync, lstatSync } from 'fs';
import path from 'path';
import { EventOptions } from './types';
import { PrismaClient } from '@prisma/client';

export class MyClient extends Client {

    commands: Map<string, Function> = new Map();
    events: EventOptions[];
    db: PrismaClient = new PrismaClient();

    async syncCommands() {
        await this.application?.commands.set(this.collectCommands()[0]);
        console.log(`Synced ${this.commands.size} base commands!`);
    }

    collectCommands(): [ApplicationCommandData[], this] {
        let cmds: ApplicationCommandData[] = [];
        const dir = path.join(__dirname, 'commands');
        const commandsDir = readdirSync(dir);
        for(const f of commandsDir) {
            const isDir = lstatSync(path.join(dir, f));
            if(isDir.isDirectory()) {
                const sdir = path.join(dir, f)
                const subDir = readdirSync(sdir);
                for(const sf of subDir) {
                    if(lstatSync(path.join(sdir, sf)).isDirectory()) continue;
                    const { command, run } = require(path.join(sdir, sf));
                    cmds.push(command);
                    this.commands.set(command.name, run);
                }
            } else {
                const { command, run } = require(path.join(dir, f));
                cmds.push(command);
                this.commands.set(command.name, run);
            }
        }
        return [cmds, this];
    }

    collectEvents() {
        let eventList: EventOptions[] = []
        const dir = path.join(__dirname, 'events');
        const eventDir = readdirSync(path.join(__dirname, 'events'));
        for(const e of eventDir) {
            const data = require(path.join(dir, e));
            eventList.push({name: data.name, run: data.run});
        }
        this.events = eventList;
        return this;
    }

    handleEvents() {
        for(const e of this.events) {
            this.on(e.name, (...args: any[]) => e.run(...args, this))
        }
        return this;
    }

    debug() {
        console.log(this.events);
        console.log(this.commands);
    }
}