import { Snowflake } from "discord.js";

class Federation {
    name:string;
    description:string;
    leader:string;
    members:Array<Snowflake>;

    constructor (name:string, leader:string, description:string, members:Array<Snowflake>) {
        this.name = name;
        this.leader = leader;
        this.description = description;
        this.members = members;
    }
}

export { Federation }