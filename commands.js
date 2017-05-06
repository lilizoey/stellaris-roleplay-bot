federation = require("./federation.js");


// this is an object containing all commands, the "do" is what will be executed when the command executes
// "do" takes the message, and the content of the message (that is, without the command part. "!foo bar" should be "bar") 
exports.dispatch = dispatch = {
    "ping": {
        "do": function(message, content) {
            message.channel.sendMessage("pong!");
        }
    },
    "fed": {
        "do": function(message, content) {
            let parsed = content.split(/\s/);
            let command = federation.dispatch[parsed[0]];
            if (command) {
                command(message, parsed[1]);
            } else {
                federation.errorCommand(message, parsed[0]);
            }
        }
    }
}