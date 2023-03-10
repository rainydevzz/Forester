"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = exports.run = void 0;
const discord_js_1 = require("discord.js");
// this is just ported from another bot I made soo that's why it's kinda shitty and not in the same style as the rest of the commands lol
async function run(interaction, bot) {
    const commands = bot.collectCommands()[0];
    let cmd = interaction.options.getString('command');
    if (cmd) {
        if (cmd.includes(' ')) {
            let args = cmd.split(' ');
            let cmdres = commands.find(c => c.name == args[0].toLowerCase());
            if (!cmdres) {
                await interaction.followUp({ content: `command ${args[0]} not found!` });
                return;
            }
            if (cmdres.options[0] && cmdres.options[0].type != 1) {
                await interaction.followUp({ content: `command ${args[0]} has no subcommands!` });
                return;
            }
            let subcmd = cmdres.options.filter(c => c.name == args[1].toLowerCase())[0];
            if (!subcmd) {
                await interaction.followUp({ content: `subcommand ${args[1]} not found!` });
                return;
            }
            let descStr = "";
            if (!subcmd.options) {
                descStr += "No Options";
            }
            else {
                for (const o of subcmd.options) {
                    descStr += `**${o.name}** - ${o.description}\n`;
                }
            }
            let embed = {
                title: `Command Info For ${cmd}`,
                description: descStr,
                color: 0x000099
            };
            await interaction.followUp({ embeds: [embed] });
        }
        else {
            let cmdres = commands.find(c => c.name == cmd.toLowerCase());
            if (!cmdres) {
                await interaction.followUp({ content: `command ${cmd} not found!` });
                return;
            }
            let descStr = "";
            if (!cmdres.options) {
                descStr += "No Options";
            }
            else {
                for (const o of cmdres.options) {
                    descStr += `**${o.name}** - ${o.description}\n`;
                }
            }
            let embed = {
                title: `Command Info For ${cmd}`,
                description: descStr,
                color: 0x000099
            };
            await interaction.followUp({ embeds: [embed] });
        }
    }
    else {
        let descStr = "";
        for (const c of commands) {
            descStr += `**${c.name}** - ${c.description}\n`;
        }
        let embed = {
            title: `Command Info`,
            description: descStr,
            color: 0x000099
        };
        await interaction.followUp({ embeds: [embed] });
    }
}
exports.run = run;
exports.command = {
    name: 'help',
    description: 'help command!',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'command',
            description: 'command to see info on',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false
        }
    ]
};
