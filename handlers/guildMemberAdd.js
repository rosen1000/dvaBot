const welcomejson = require("../welcomes.json");

module.exports = (bot) => {
    bot.on("guildMemberAdd", async(member) => {
        //Eva's server
        if (member.guild.id == 514125758751440896) {
            let welcomeChannel = member.guild.channels.find(ch => ch.id == 514125758751440900);
            if (!welcomeChannel) return;
            
            let rulesChannel = member.guild.channels.find(ch => ch.id == 519828142370586625);
            let introductionChannel = member.guild.channels.find(ch => ch.id == 604352341726199838);
            console.log(welcomeChannel.guild.channels.find(ch => ch.id == "514125758751440900"))
            welcomeChannel.guild.channels.find(ch => ch.id == 514125758751440900).send(`Welcome ${member} Make sure to read and follow the ${rulesChannel} and introduce yourself in ${introductionChannel}. Have a great time!`);
            return;
        }
        let memberrole = member.guild.roles.find(r => r.name == "Members");
        let botrole = member.guild.roles.find(r => r.name == "BOTS");
        if (memberrole) {
            if (!member.user.bot) {
                await member.addRole(memberrole.id)
            }
        }
        if (botrole) {
            if (member.user.bot) {
                await member.addRole(botrole.id)
            }
        }

        let numMSG = Math.floor(Math.random() * 37) + 1;
        let wellcomemsg = welcomejson[numMSG]
        var sendMSG = wellcomemsg.replace("${member}", member)
        var welcomeChannel = member.guild.channels.find(ch => ch.name == "welcome");
        if (!welcomeChannel) return;
        welcomeChannel.send(`${sendMSG}`)
    });
}