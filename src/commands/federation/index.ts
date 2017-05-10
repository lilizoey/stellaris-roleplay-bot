import * as fs from "fs";
import { TextCommand, parseIntoCollection } from "../../utils";
import { Collection, Snowflake } from "discord.js";
import { Federation } from "./federationUtils";
import { sep } from "path";
 
type FederationID = string;

let dispatch = new Collection<string, TextCommand>();

let federations = new Collection<FederationID, Federation>(); 

function addCommand(name: string, command: TextCommand) {
    if (name == "federation") return;
    dispatch.set(name,command);
}

function initFederationList() {
    federations = parseIntoCollection<FederationID, Federation>(
        `${__dirname}${sep}federationList.json`,
        (key) => key,
        federationFromAny
    )
}

function federationFromAny(val:any) {
    if (!val.name || !val.leader || !val.description || !val.members) return null;

    let returnValue;

    try {
        return new Federation(val.name, val.leader, val.description, val.members);
    } catch (err) {
        console.log(`Failed to parse ${val} as federation`)
        return null;
    }
}

function init() {
    initFederationList();
}

export { dispatch, addCommand, init, federations };