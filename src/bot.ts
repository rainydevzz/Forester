import { ApplicationCommandData, ApplicationCommandOptionChoiceData, AutocompleteInteraction, Client } from 'discord.js';
import { readdirSync, lstatSync } from 'fs';
import path from 'path';
import { EventOptions } from './types';
import { PrismaClient } from '@prisma/client';
import { logger } from './utils/logger';

export class MyClient extends Client {

    commands: Map<string, Function> = new Map();
    events: EventOptions[];
    components: Map<string, Function> = new Map();
    db: PrismaClient = new PrismaClient();

    async syncCommands() {
        await this.application?.commands.set(this.collectCommands()[0]);
        logger.info({COMMANDS: `Synced All Commands!`});
    }

    async autocompleteTags(interaction: AutocompleteInteraction) {
        let arr: ApplicationCommandOptionChoiceData[] = [];
        const res = await this.db.tags.findMany({where: {guild: interaction.guildId}});
        for(const r of res) {
            arr.push({name: r.name, value: r.name});
        }
        return arr;
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
        logger.info({EVENTS: "Collected All Events!"});
        return this;
    }

    collectComponents() {
        const dir = path.join(__dirname, 'handlers/components');
        const dirData = readdirSync(dir);
        for(const f of dirData) {
            const fp = path.join(dir, f);
            const {id, run} = require(fp);
            this.components.set(id, run);
        }
        logger.info({COMPONENTS: "Collected All Components!"});
        return this;
    }

    handleEvents() {
        for(const e of this.events) {
            try {
                this.on(e.name, (...args: any[]) => e.run(...args, this));
            } catch(err) {
                logger.error({ERROR: err});
            }
        }
        return this;
    }

    isOwner(id: string) {
        const owners = process.env.OWNERS.split(' ');
        return owners.includes(id);
    }

    genString(): string {
        const r = Math.random().toString(36).substring(2, 18);
        return r;
    }

    debug() {
        console.log(this.events);
        console.log(this.commands);
    }
}