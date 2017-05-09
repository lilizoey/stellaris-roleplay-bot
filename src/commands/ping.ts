import * as Discord from "discord.js";
import { TextCommand, CommandContent } from "../utils";

export default new TextCommand(
    "ping",
    "Says \"Pong!\" if bot is available",
    "<insert better description here>",
    (message:Discord.Message, content:CommandContent) => {
        message.channel.send("Pong!");
    },
    "ping"
);
