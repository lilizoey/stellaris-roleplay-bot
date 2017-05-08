import * as Discord from "discord.js";

let dispatch = {}
let errorCommand = function(message:Discord.Message, attempt:Discord.Message) {
    message.channel.sendMessage(attempt + " isn't a recognized federation command!");
}

export {dispatch, errorCommand};