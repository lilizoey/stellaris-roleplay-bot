const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
client.login(token);
const fs = require('fs')
let allfeds = JSON.parse(fs.readFileSync('./federations.json', 'utf8'));
let newUsers = new Discord.Collection();

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("!" + str);
}

client.on('ready', () => {
    console.log('The bot is online!');
});

client.on("guildMemberAdd", (member) => {
  if (!allfeds[member.user.id]) allfeds[member.user.id] = {
    name: member.user.username,
    federation: "none"
  };
  fs.writeFile('./federations.json', JSON.stringify(allfeds), (err) => {
    if (err) console.error(err)
  });
});

client.on('message', message => {
    var args = message.content.split(/[ ]+/);
    if(commandIs("whatid", message)){
        message.channel.sendMessage('Your personal ID is ' + message.author.id)
    }
    if(commandIs("federation", message)){
        if(args[1] === "join"){
            if(allfeds[message.author.id].federation === "none"){
                let fedname = args[2] && args[3];
                if(fedname === undefined){
                    message.channel.sendMessage('You did not provide a federation name')
                } else {
                    if(allfeds.federation === args[2] + " " + args[3]){
                       allfeds[message.author.id] = {
                       federation: args[2] +" "+ args[3]
                       };
                       fs.writeFile('./federations.json', JSON.stringify(allfeds), (err) => {
                       if (err) console.error(err)
                    }); 
                    message.channel.sendMessage('You have joined the federation ' + allfeds[message.author.id].federation)
                    } else {
                        message.channel.sendMessage('The federation you specified does not exist' + allfeds[args[2] + " " + args[3]].federation)
                    }
                }
            } else {
                message.channel.sendMessage('You are already in a federation')
            }
        }
        if(args[1] === "create"){
            if(allfeds[message.author.id].federation === "none"){
                let fedname = args[2] && args[3];
                if(fedname === undefined){
                    message.channel.sendMessage('You did not provide a new federation name')
                } else {
             allfeds[message.author.id] = {
                  federation: args[2] +" "+ args[3]
            };
            fs.writeFile('./federations.json', JSON.stringify(allfeds), (err) => {
            if (err) console.error(err)
            });}
            } else {
                message.channel.sendMessage('You are already in a federation')
            }
        }
        if(args[1] === "leave"){
            if(allfeds[message.author.id].federation === "none"){
                message.channel.sendMessage('You are not in a federation')
            } else {
                allfeds[message.author.id] = {
                  federation: "none"
                };
                fs.writeFile('./federations.json', JSON.stringify(allfeds), (err) => {
                if (err) console.error(err)
                });
            }
        }
        if(args[1] === "rename"){
            let fedname = args[2] && args[3];
            if(fedname === undefined){
            message.channel.sendMessage('You did not provide a new federation name')
            } else {
                allfeds[message.author.id] = {
                  federation: args[2] +" "+ args[3]
            };
            fs.writeFile('./federations.json', JSON.stringify(allfeds), (err) => {
            if (err) console.error(err)
            });
            }
        }
        let myfed = allfeds[message.author.id].federation;
        if(myfed === "none"){
            message.channel.sendMessage('You are not in a federation')
        } else {
        message.channel.sendMessage('Your are currently in the' +myfed+' federation');
        }
    }
    if(commandIs("userinfo", message)){
        let usernme = allfeds[message.author.id].name
        let myfed = allfeds[message.author.id].federation;
        message.channel.sendMessage("Here it the your user information " + usernme + myfed)
    }

});