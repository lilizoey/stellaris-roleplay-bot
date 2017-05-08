import * as Discord from "discord.js";
import { TextCommand } from "../utils";

export default new TextCommand(
    "eval",
    "shh",
    "only for very priviledged peeps",
    (message:Discord.Message, content:string) => {
        if (message.author.id === "105759860208979968" || message.author.id === "211977486966325259") {
            try {
                console.log(message.content)
                console.log(content)
                eval(content);                
            } catch (err) {
                console.log(err);
            }
        }
    });
