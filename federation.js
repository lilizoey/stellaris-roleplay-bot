exports.dispatch = {}

exports.errorCommand = function(message, attempt) {
    message.channel.sendMessage(attempt + " isn't a recognized federation command!");
}