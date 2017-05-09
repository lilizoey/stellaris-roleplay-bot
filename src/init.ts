import { initCommands, makePath } from "./utils";
import { addCommand as commAdd} from "./commands/";
import { addCommand as fedAdd} from "./commands/federation/"
import { readdir, lstat } from "fs";
import { sep } from "path";

function init() {
    forEachDirDeep("./commands", (dir:string) => {
        try {
            let index = require(makePath(dir, "index.js"));
            initCommands(dir, index.addCommand);
            
            if (index.init != null) {
                index.init();
            }
        } catch (err) {
            console.log(`failed to init directory ${dir} with error: \n${err}`);
        }
    });
}

function forEachDirDeep(dir:string, func:(dir:string) => void) {
    func(dir);
    
    readdir(dir, (err, files) => {
        for (let file of files) {
            lstat(makePath(dir, file), (err, stats) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (stats.isDirectory()) {
                    forEachDirDeep(makePath(dir, file), func);
                } 
            })
        }
    });
}

export { init };