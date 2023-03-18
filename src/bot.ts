import { ApplicationCommandData, ApplicationCommandOptionChoiceData, AutocompleteInteraction, Client, User } from 'discord.js';
import { readdirSync, lstatSync } from 'fs';
import path from 'path';
import { CooldownOptions, EventOptions } from './types';
import { PrismaClient } from '@prisma/client';
import { logger } from './utils/logger';

export class MyClient extends Client {

    commands: Map<string, Function> = new Map();
    events: EventOptions[];
    components: Map<string, Function> = new Map();
    db: PrismaClient = new PrismaClient();
    cooldown: Map<string, CooldownOptions[]> = new Map();

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

    async getBal(member: User) {
        const res = await this.db.econ.findFirst({
            where: {user: member.id}
        });
        if(!res) {
            await this.db.econ.create({data: {
                user: member.id,
                balance: 100
            }});
            return 100;
        } else {
            return res.balance;
        }
    }

    async changeBal(user: User, change: number) {
        const res = await this.getBal(user);
        await this.db.econ.update({where: {user: user.id}, data: {
            balance: res + change
        }});

        return res + change;
    }

    async getItem(name: string) {
        const res = await this.db.shop.findFirst({where: {name: name}});
        return res;
    }

    async getInv(user: User, name: string, full: boolean) {
        let data = {user: user.id};
        if(!full) {
            data['name'] = name;
        }
        const res = await this.db.inventory.findMany({where: {AND: data}});
        return res;
    }

    async getShop() {
        const res = await this.db.shop.findMany();
        return res;
    }

    async buy(member: User, item: string): Promise<['quantity' | 'item' | 'balance' | 'success', number?, number?]> {
        const userRes = await this.getBal(member);
        const itemRes = await this.getItem(item);
        if(!itemRes) {
            return ['item'];
        }
        if(itemRes.price > userRes) {
            return ['balance', itemRes.price, userRes];
        }

        if(itemRes.quantity == 0) {
            return ['quantity']
        }

        const invRes = await this.getInv(member, itemRes.name, false);
        if(!invRes[0]) {
            await this.db.inventory.create({data: {
                user: member.id,
                name: itemRes.name,
                quantity: 1,
                id: this.genString()
            }});
            await this.changeQuantity(itemRes.name, -1);
            await this.changeBal(member, -itemRes.price);
            return ['success'];
        } else {
            await this.db.inventory.updateMany({where: {AND: {
                name: itemRes.name,
                user: member.id
            }},
            data: {
                quantity: invRes[0].quantity + 1
            }});
            await this.changeQuantity(itemRes.name, -1);
            await this.changeBal(member, -itemRes.price);
            return ['success'];
        }
    }

    async changeQuantity(name: string, num: number) {
        await this.db.shop.update({where: {name: name}, data: {
            quantity: {increment: num}
        }});
    }

    async changePrice(name: string, num: number) {
        await this.db.shop.update({where: {name: name}, data: {price: num}});
    }

    async addItem(name: string, quantity: number, price: number) {
        const res = await this.getItem(name);
        if(res) {
            await this.changeQuantity(name, quantity);
            return res;
        }
        const i = await this.db.shop.create({
            data: {
                name: name,
                quantity: quantity,
                price: price
            }
        });
        return i;
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
        const r = Math.random().toString(36).substring(2, 20);
        return r;
    }

    getCooldown(id: string, command: string, cooldown: number) {
        const user = this.cooldown.get(id);
        const data = {timestamp: new Date().getTime(), cooldown: cooldown, command: command};
        if(!user) {
            this.cooldown.set(id, [data]);
            return [true];
        }
        const cmd = user.find(c => c.command == command);
        if(!cmd) {
            user.push(data);
            return [true];
        }
        if(data.timestamp - cmd.timestamp < data.cooldown) {
            let num = Math.floor((data.cooldown - (data.timestamp - cmd.timestamp)) / 60000);
            return [false, num];
        } else {
            delete user[user.indexOf(cmd)];
            user.push(data);
            return [true];
        }
    }

    debug() {
        console.log(this.events);
        console.log(this.commands);
    }
}