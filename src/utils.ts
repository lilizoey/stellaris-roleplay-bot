import * as Discord from "discord.js";
import * as Commands from "./commands/";
import * as fs from "fs";
import { sep } from "path";


type Message = Discord.Message;

class TextCommand {
    readonly name:string;
    readonly desc:string;
    readonly complexDesc:string;
    readonly run: (message:Message, content:CommandContent) => void;
    readonly usageString:string;
    readonly options:Array<{name:string, desc:string}>;

    constructor(name:string, desc:string, complexDesc:string, run:(message:Message, content:CommandContent) => void, usageString:string, options:Array<{name:string, desc:string}> = new Array()) {
        this.name = name;
        this.desc = desc;
        this.complexDesc = complexDesc;
        this.run = run;
        this.usageString = usageString;
        this.options = options;
    }

    usageHelp() {
        return `**Usage:** ${this.usageString}\n` +
               `**options:** ${this.options.join("\t")}`;
    }
}

class CommandContent {
    readonly content:string;
    
    constructor(content:string) {
        this.content = content;
    }

    isEmpty() {
        return this.content == "";
    }

    splitContent() {
        return this.content.split(/\s/);
    }

    tail() {
        return new CommandContent(this.splitContent().slice(1).join(" "));
    }
}

function startsWith(haystack:string, needle:string) {
    return haystack.indexOf(needle) === 0;
}

function initCommands(path: string, addCommand: (key:string, command:TextCommand) => void ) {
    fs.readdir(path, (err, files) => {
        if (err) console.log(err);
        for (let file of files) {
            console.log(makePath(path, file));
            if (fs.lstatSync(makePath(path, file)).isDirectory()) file += `${sep}${file}.js`;
            if (!file.endsWith(".js")) continue;
            if (file.endsWith("index.js")) continue;

            let imp = require(makePath(path, file)).default;
            if (imp instanceof TextCommand) {
                let name = imp.name
                addCommand(name, imp);
            }
        }
    });
}

function makePath(dir:string, file:string) {
    return dir + sep + file;
}

function parseIntoCollection<K,V>(path:string, keygen:(key:string) => K, cons:(obj:any) => V | null) {
    let collection = new Discord.Collection<K,V>();
    let contents = fs.readFileSync(path, "UTF-8");

    Object.entries(JSON.parse(contents)).forEach(
        ([key, value]) => {
            let consVal = cons(value);
            if (consVal == null) return;

            collection.set(keygen(key), consVal)
        }
    );

    return collection;
}

export { TextCommand, startsWith, initCommands, CommandContent, makePath, parseIntoCollection };
