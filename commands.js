exports.commandList = {
    "ping": {
        "do": function(message, content) {
            message.channel.sendMessage("pong!");
        }
    }
}