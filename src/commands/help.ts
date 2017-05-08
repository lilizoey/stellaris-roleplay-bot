import { Message } from "discord.js";
import { TextCommand } from "../utils";
import { dispatch } from "./index";
import { reduce } from "object.reduce";

export default new TextCommand(
    "help",
    "Provides a short description for each command, or indepth for any specific command.",
    (message: Message, content: string) => {
        message.channel.send(
            reduce(dispatch,
            (acc, val, key, obj) => {
                acc + val.name + " " + val.desc + "\n";
            })
        )
    }
)