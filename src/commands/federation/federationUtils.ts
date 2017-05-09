import { Snowflake } from "discord.js";

class Federation {
    name:string;
    description:string;
    members:Array<Snowflake>;

    constructor (name:string, description:string, members:Array<Snowflake>) {
        this.name = name;
        this.description = description;
        this.members = members;
    }
}

export { Federation }