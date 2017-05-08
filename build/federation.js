"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let dispatch = {};
exports.dispatch = dispatch;
let errorCommand = function (message, attempt) {
    message.channel.sendMessage(attempt + " isn't a recognized federation command!");
};
exports.errorCommand = errorCommand;
