const { LOCALE } =  require("../util/ayam");
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
    name:"out",
    aliases: "o",
    description: i18n.__('invite.description'),
    execute(message){
        const { channel } = message.member.voice;
        message
            .reply("Ayamnya diusir")
            .catch(console.error);
            channel.leave();
    }
}