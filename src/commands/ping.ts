import * as Discord from "discord.js";
import { TextCommand } from "../utils";

export default new TextCommand("ping",
    "Says \"Pong!\" if bot is available",
    (msg:Discord.Message, content:string) => {
        msg.channel.send("Pong!");
    });
