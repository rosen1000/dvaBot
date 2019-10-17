module.exports = {
    /**
     * @param {Message} message
     * Message object to find from
     * 
     * @param {String|ID} id
     * Something to find
     * 
     * @returns 
     * GuildMember
     */
    getMember(message, id) {
        id = id.toLowerCase();
        let target = message.guild.members.get(id);

        if (!target && message.mentions.members) {
            target = message.mentions.members.first();
        } else if (!target && id) {
            target = message.guild.members.find(m => {
                return m.displayName.toLowerCase().includes(id) ||
                m.user.tag.toLowerCase().includes(id);
            });
        } else if (!target) target = message.member;

        return target;
    },
    /**
     * @param date
     * 
     * @returns {String}
     * Formated Date
     */

    formatDate: (date) => {
        let options = {
            dateStyle: "short",
            timeZone: "Europe/Sofia"
        }
        return new Intl.DateTimeFormat("en-GB", options).format(date);
    }
}