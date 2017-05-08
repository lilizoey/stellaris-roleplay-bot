import { Message } from "discord.js";
import { TextCommand } from "../utils";
import { dispatch } from "./index";
const reduce = require("object.reduce");

function describeAll() {

}

export default new TextCommand(
    "help",
    "Provides a short description for each command, or indepth for any specific command.",
    (message: Message, content: string) => {
        message.channel.send(
            reduce(dispatch,
            (acc:string, val:TextCommand, key:string, obj:{[key:string]:TextCommand}) => {
                acc + val.name + " " + val.desc + "\n";
            })
        )
    }
)