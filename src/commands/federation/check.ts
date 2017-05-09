import * as Discord from "discord.js";
import { TextCommand, CommandContent } from "../../utils";
import { federations } from "./index";

export default new TextCommand(
    "check",
    "checks federationslist",
    "<insert better description here>",
    (message:Discord.Message, content:CommandContent) => {
        message.channel.send(`fed: ${federations.reduce((acc:string, val, key, coll) => {
            return acc + val.name;
        },"")}`);
    },
    "federation"
);
