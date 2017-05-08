import { Message } from "discord.js";
import { TextCommand } from "../utils";
import { dispatch } from "./index";
const reduce = require("object.reduce");

function describeAll(message: Message) {
    let text = "";
    for (let command of dispatch) {
        text += `**${command[1].name}**: ${command[1].desc}\n`;
    }
    message.channel.send(text);
}

function describe(message: Message, content: string) {
    let command = dispatch.get(content);
    
    if (command != null) {
        message.channel.send(`**${command.name}**: ${command.complexDesc}`);
    } else {
        message.channel.send("That is not a recognized command!");
    }
}

export default new TextCommand(
    "help",
    "Provides a short description for each command, or indepth for any specific command.",
    "<insert better description here>",
    (message: Message, content: string) => {
        if (content == "") {
            describeAll(message);
        } else {
            describe(message, content);
        }
    }
);