import * as Discord from "discord.js";
import { TextCommand, CommandContent } from "../../utils";
import { dispatch } from "./index";


const command = new TextCommand(
    "federation",
    "commands to manage federations",
    "unimplemented",
    main,
    "federation command [options]"
)

export default command;

function main(message: Discord.Message, content: CommandContent) {
    if (command == null) return;

    if (content.isEmpty()) {
        message.channel.send(command.usageHelp());
        return;
    } 

    let fedCommand = dispatch.get(content.splitContent()[0]);
    if (fedCommand != null) {
        fedCommand.run(message, content.tail());
    } else {
        errorCommand(message, content.splitContent()[0]);
    }
}

function errorCommand(message: Discord.Message, attempt: string) {
    message.channel.send(attempt + " isn't a recognized federation command!");
}