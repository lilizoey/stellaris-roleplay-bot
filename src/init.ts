import * as fs from "fs";
import { addCommand } from "./commands/";
import { TextCommand } from "./utils";

function initCommands() {
    fs.readdir("./build/commands", (err, files) => {
        if (err) console.log(err);
        for (let file of files) {
            if (!file.endsWith(".js")) continue;
            if (file.endsWith("index.js")) continue;

            let imp = require("./commands/" + file).default;
            if (imp instanceof TextCommand) {
                let name = imp.name
                addCommand(name, imp);
            }
        }
    });
}

export { initCommands };