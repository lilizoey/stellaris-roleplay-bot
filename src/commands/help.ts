import { Message } from "discord.js";
import { TextCommand, CommandContent } from "../utils";
import { dispatch } from "./index";
const reduce = require("object.reduce");

function describeAll(message: Message) {
    let text = "";
    for (let command of dispatch) {
        text += `**${command[1].name}**: ${command[1].desc}\n`;
    }
    message.channel.send(text);
}

function describe(message: Message, content: CommandContent) {
    let command = dispatch.get(content.content);
    
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
    (message: Message, content: CommandContent) => {
        if (content.isEmpty()) {
            describeAll(message);
        } else {
            describe(message, content);
        }
    },
    "help [command]"
);