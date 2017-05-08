import * as fs from "fs";
import { TextCommand } from "../utils";

let dispatch: { [key: string]: TextCommand } = {};

function addCommand(name: string, command: TextCommand) {
    dispatch[name] = command;
}

export { dispatch, addCommand };