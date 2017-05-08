import * as Discord from "discord.js";
import { TextCommand } from "../utils";

export default new TextCommand(
    "ping",
    "Says \"Pong!\" if bot is available",
    "<insert better description here>",
    (message:Discord.Message, content:string) => {
        message.channel.send("Pong!");
    });
