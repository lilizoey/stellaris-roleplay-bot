import * as fs from "fs";
import { TextCommand } from "../utils";

let dispatch: { [key: string]: TextCommand } = {};

fs.readdir(".", (err, files) => {
    if (err) console.log(err);
    for (let file of files) {
        if (!file.endsWith(".ts")) continue;
        if (file.endsWith("index.ts")) continue;

        let imp = require(file).default;
        if (imp instanceof TextCommand) {
            let name = imp.name
            dispatch.name = imp;
        }
    }
})

export { dispatch };