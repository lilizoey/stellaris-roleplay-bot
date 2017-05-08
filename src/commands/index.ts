import * as fs from "fs";
import { TextCommand } from "../utils";

fs.readdir(".", (err, files) => {
    if (err) console.log(err);
    for (let file of files) {
        if (!file.endsWith(".ts")) continue;
        if (file.endsWith("index.ts")) continue;

        let imp = require(file).default;
        if (typeof imp === )
    }
})

let dispatch = 