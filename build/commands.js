"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class textCommand {
    constructor(name, desc, run) {
        this.name = name;
        this.desc = desc;
        this.run = run;
    }
}
exports.textCommand = textCommand;
let dispatch = {
    "ping": new textCommand("ping", "says \"pong\" in chat if the bot is available", function (message, content) {
        message.channel.sendMessage("pong!");
    }),
};
exports.dispatch = dispatch;
