import { initCommands } from "./utils";
import { addCommand as commAdd} from "./commands/";
import { addCommand as fedAdd} from "./commands/federation/"

function init() {
    initCommands("./commands", commAdd);
    initCommands("./commands/federation", fedAdd);
}

export { init };