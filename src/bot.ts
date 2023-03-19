import { ApplicationCommandData, ApplicationCommandOptionChoiceData, AutocompleteInteraction, Client, EmbedBuilder, TextChannel, User } from 'discord.js';
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
    messageMap: Map<string, Map<string, string[]>> = new Map();

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
            await this.changePrice(name, price);
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

    async getLevelChannel(guild: string) {
        return (await this.db.levelsys.findFirst({where: {guild: guild}})).channel;
    }

    async upsertLevel(user: string, guild: string, xp?: number): Promise<boolean> {
        const res = await this.db.levels.findMany({where: {AND: {user: user, guild: guild}}});
        if(!res[0]) {
            await this.db.levels.create({data: {
                user: user,
                guild: guild,
                level: 0,
                xp: 0,
                id: this.genString()
            }});
            return false;
        } else {
            if(!xp) xp = 0;
            if(xp + res[0].xp >= 100) {
                await this.db.levels.updateMany({where: {AND: {guild: guild, user: user}}, data: {
                    level: {increment: 1},
                    xp: 0
                }});
                return true;
            }
            await this.db.levels.updateMany({where: {AND: {user: user, guild: guild}}, data: {
                xp: {increment: xp}
            }});
            return false;
        }
    }

    async doLevels() {
        while(true) {
            const a = await this.awardXP();
            await this.sendLevelUp(a);
            await new Promise(r => setTimeout(r, 60000));
        }
    }

    async awardXP() {
        let arr: [string, string][] = [];
        for(const g of this.messageMap.keys()) {
            for(const u of this.messageMap.get(g).keys()) {
                const l = await this.upsertLevel(u, g, this.messageMap.get(g).get(u).length)
                if(l) {
                    arr.push([u, g]);
                }
            }
        }
        this.messageMap = new Map();
        return arr;
    }

    async sendLevelUp(arr: [string, string][]) {
        for(const i in arr) {
            const user = this.users.cache.get(arr[i][0]);
            const channel = this.channels.cache.get(await this.getLevelChannel(arr[i][1])) as TextChannel;
            await channel.send(`GG ${user.tag}, you advanced a level!`);
        }
    }

    async getTotalXP(guild: string): Promise<[string, number, number][]> {
        let arr = [];
        
        let res = await this.db.levels.findMany({where: {guild: guild}});
        const members = await this.guilds.cache.get(guild).members.fetch();
        for(const i of res) {
            const userCheck = members.get(i.user);
            if(!userCheck) {
                await this.db.levels.deleteMany({where: {AND: {guild: guild, user: i.user}}});
            }
        }
        res = await this.db.levels.findMany({where: {guild: guild}});
        for(let i = 0; i < 10; i++) {
            if(!res[i]) break;
            let xp = res[i].xp + (res[i].level * 100);
            arr.push([res[i].user, xp, res[i].level]);
        }
        arr.sort((a, b) => b[1] - a[1]);
        return arr;
    }

    doLevelLB(arr: [string, number, number][], guild: string) {
        let fields = [];
        for(const i of arr) {
            const user = this.guilds.cache.get(guild).members.cache.get(i[0]);
            if(!user) continue;
            fields.push({name: `${arr.indexOf(i) + 1}. ${user.user.tag}`, value: `Level ${i[2]} - Total XP ${i[1]}`});
        }
        const embed = new EmbedBuilder()
            .setTitle(`Leaderboard!`)
            .setDescription("Leaderboard for this server")
            .setFields(fields);

        return embed;
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
        if(user.length == 0) {
            user.push(data);
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

    addMessage(msg: string, user: string, guild: string): void {
        const guildRes = this.messageMap.get(guild);
        if(!guildRes) {
            this.messageMap.set(guild, new Map().set(user, [msg]));
            return;
        }
        const userRes = guildRes.get(user);
        if(!userRes) {
            guildRes.set(user, [msg]);
            return;
        }
        userRes.push(msg);
    }

    debug() {
        console.log(this.events);
        console.log(this.commands);
    }
}