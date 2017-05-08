import * as Discord from "discord.js";
import * as Commands from "./commands/";
import * as fs from "fs";
import { sep } from "path";


type Message = Discord.Message;

class TextCommand {
    readonly name:string;
    readonly desc:string;
    readonly complexDesc:string;
    readonly run: (message:Message, content:string) => void;

    constructor(name:string, desc:string, complexDesc:string, run:(a:Message, b:string) => void) {
        this.name = name;
        this.desc = desc;
        this.complexDesc = complexDesc;
        this.run = run;
    }
}

function startsWith(haystack:string, needle:string) {
    return haystack.indexOf(needle) === 0;
}

function initCommands(path: string, addCommand: (key:string, command:TextCommand) => void ) {
    fs.readdir(path, (err, files) => {
        if (err) console.log(err);
        for (let file of files) {
            console.log(path + sep + file);
            if (fs.lstatSync(path + sep + file).isDirectory()) file += `${sep}${file}.js`;
            if (!file.endsWith(".js")) continue;
            if (file.endsWith("index.js")) continue;

            let imp = require(path + sep + file).default;
            if (imp instanceof TextCommand) {
                let name = imp.name
                addCommand(name, imp);
            }
        }
    });
}

export { TextCommand, startsWith, initCommands };
