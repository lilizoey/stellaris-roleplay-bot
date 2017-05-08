import Federation = require("./federation.js");
import * as Discord from "discord.js";
type Message = Discord.Message;

class textCommand {
    readonly name:string;
    readonly desc:string;
    readonly run: (a:Message, b:string) => void;

    constructor(name:string, desc:string, run:(a:Message, b:string) => void) {
        this.name = name;
        this.desc = desc;
        this.run = run;
    }
}

let dispatch:{[key: string]: textCommand} = {
    "ping": new textCommand(
        "ping", 
        "says \"pong\" in chat if the bot is available",
        function(message, content) {
            message.channel.sendMessage("pong!");
        }),
}

export {dispatch, textCommand};