import * as Discord from "discord.js";
import { TextCommand, CommandContent } from "../../utils";
import { federations } from "./index";

export default new TextCommand(
    "create",
    "unimplemented",
    "<insert better description here>",
    (message:Discord.Message, content:CommandContent) => {
        console.log("called unimplemented federation create");
    },
    "create"
);
