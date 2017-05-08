import * as Discord from "discord.js";
import * as Commands from "./commands/";

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

export { TextCommand, startsWith };