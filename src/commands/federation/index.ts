import * as fs from "fs";
import { TextCommand } from "../../utils";
import { Collection, Snowflake } from "discord.js";
import { Federation } from "./federationUtils";
 
type federationID = string;

let dispatch = new Collection<string, TextCommand>();

let federations = new Collection<federationID, Federation>(); 

function addCommand(name: string, command: TextCommand) {
    if (name == "federation") return;
    dispatch.set(name,command);
}

function initFederationList() {
    federations = parseFederationJson(`${__dirname}/federationList.json`);
}

function parseFederationJson(path:string) {
    let collection = new Collection<federationID, Federation>();
    let contents:string = fs.readFileSync(path,"UTF-8");

    //// DANGERNOODLES LOSING TYPE SAFETY
    let fedJson: any = JSON.parse(contents);
    
    try {
        for (let val of fedJson) {
            let fed = new Federation(val.name, val.description, val.members);
            collection.set(val.name, fed);
        }   
    } catch (err) {
        console.log(`failed to read federationList:\n${fedJson}\nwith err:\n${err}`)
    }
    //// DANGERNOODLES OVER

    return collection;
}

function init() {
    initFederationList();
}

export { dispatch, addCommand, init, federations };