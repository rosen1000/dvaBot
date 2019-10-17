let Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //Command is private so check if the right person is using it
    if (message.author.id != 353464955217117185) return message.channel.send("The command is currently private, but it will be available when it's done for the public");

    //Create lobby
    let lobby = [{ user: message.author, ready: false }];

    //Notify the users that everything is ready
    message.channel.send("Lobby has been created!\nIf someone wants to join just type `?join` and ill add you up!\nWhen everyone is ready the starter must type `?start`");

    //Create filter if someone types "?join"
    const joinFilter = m => m.content.startsWith("?join");

    //Create message collector in the channel where the command was used with the filter
    let join = new Discord.MessageCollector(message.channel, joinFilter);

    //Event listener
    join.on("collect", collected => {
        //Check the lobby if the user is already in
        for (let i = 0; i < lobby.length; i++) {
            if (lobby[i].id == collected.member.user.id) return message.channel.send("You are already in the lobby!");
        }

        //Add the user to the lobby
        lobby.push({ user: collected.member.user, ready: false });

        //Notify that the user has joined the lobby
        message.channel.send(collected.member.nickname + " joined the lobby! Now we are " + lobby.length);
    })
    
    //Create filter if someone types "?start"
    const startFilter = m => m.content == "?start";

    //Create message collector in the current channel with the filter to be used only once
    let start = new Discord.MessageCollector(message.channel, startFilter, { maxMatches: 1 });

    //Event listener
    start.on("end", end => {

        //Close the join command listener
        join.stop();

        //Notify the users that the lobby is done and closed for newcomers
        message.channel.send("The game will begin! No one is able to join");

        //For each in the lobby
        for (let i = 0; i < lobby.length; i++) {

            //Create a DM channel
            lobby[i].user.createDM().then(DM => {

                //Tell them to give name and image
                DM.send("Please send me the name and an image of your waifu/husbando as tribute");

                //Create filter for no bots (bcz the bot triggers just m => m)
                const emptyFilter = m => m.author.bot == false;

                //Wait for the name and the image
                DM.awaitMessages(emptyFilter, { max: 1 }).then(collected => {

                    //Set up variables
                    let name = collected.first().content;
                    let img;
                    let noimg = false;
                    try {
                        //Get image's link
                        img = collected.first().attachments.first().url;

                        //If the user didn't give an image the code will bug out and try catch will catch the error and require the image again
                    } catch (e) {

                        //Remember that the user is lazy
                        noimg = true;

                        //Remind them for the image
                        DM.send("Please send an image for " + name);

                        //Wait for the image
                        DM.awaitMessages(emptyFilter, { maxMatches: 1 }).then(collected2 => {
                            //Get image's link
                            img = collected2.first().attachments.first().url;

                            //Save it in the lobby object
                            lobby[i].anime = name;
                            lobby[i].img = img;
                            lobby[i].ready = true;

                            //Check if everyone is ready
                            let ready = checkReady(lobby);

                            //If so proceed to the main part (Where the battle will actuall happen)
                            if (ready) beginMain(lobby, message);
                        });
                    }

                    //Check if the user forgot the image
                    if (!noimg) {

                        //If he didn't get image's link
                        img = collected.attachments[0];

                        //Save in the lobby onject
                        lobby[i].anime = name;
                        lobby[i].img = img;
                        lobby[i].ready = true;

                        //Check if everyone is ready
                        let ready = checkReady(lobby);

                        //If so let the battle begin!
                        if (ready) beginMain(lobby, message);
                    }
                });
            });
        }
    });
}

let checkReady = function (lobby) {
    //Scroll trought the lobby
    for (let i = 0; i < lobby; i++) {
        //If someone is not ready return false
        if (lobby[i].ready = false) return false;
    }
    //If everyone is ready return true
    return true;
}

let beginMain = function (lobby, message) {
    //TODO: Automaticly make channel where all the battles will happen, make the battles and elect the winner

    let battleFields = message.guild.createChannel('the battlefields', { type: "category", permissionOverwrites: [{ id: message.guild, deny: ['SEND_MESSAGES'] }] });
    let fights = [[], []];
    let temp = lobby;
    for (let i = 0; i < temp.length; i++) {
        let j;
        let flag;
        do {
            j = Math.floor(Math.random() * temp.length);
            flag = false;
            for (let k = 0; k < temp.length; k++) {
                if (temp[k][1] == temp[j]) {
                    flag = true;
                    break;
                }
                if (temp[k][2] == temp[j]) {
                    flag = true;
                    break;
                }
            }
        } while (flag);
        fights[i][1] = temp[j];

        do {
            j = Math.floor(Math.random() * temp.length);
            flag = false;
            for (let k = 0; k < temp.length; k++) {
                if (temp[k][1] == temp[j]) {
                    flag = true;
                    break;
                }
                if (temp[k][2] == temp[j]) {
                    flag = true;
                    break;
                }
            }
        } while (flag);
        fights[i][2] = temp[j];
    }
    if (temp.length % 2 == 1) {
        fights.pop();
    }
    delete temp;
}

module.exports.help = {
    name: "battle",
    desc: "Private command for the time being",
    use: "private"
}