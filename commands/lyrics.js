const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const { LOCALE } = require("../util/ayam");
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
  name: "lyrics",
  aliases: ["ly","lyric"],
  description: i18n.__("lyrics.description"),
  async execute(message,args) {
    const queue = message.client.queue.get(message.guild.id);

    let lyrics = null;
    if (!args.length){
      if (!queue) return message.channel.send(i18n.__("lyrics.errorNotQueue")).catch(console.error);
      title = queue.songs[0].title;
      title = title.replace(/[^a-zA-Z ]/g, "");
      xp = "";
      title = title.split(" ");
      title.forEach(element => {
        filter = element.toLowerCase();
        if (filter!="official" && filter!="music" && filter!="official video" && filter!="hd" && filter!="streaming" && filter!="lyric" && filter!="official audio" && filter!="video" && filter!="videos" && filter!="full"){
          xp += " "+ filter;
        }
    });
    
    title = xp;
    console.log(message.member.voice + "requested lyrics for" + title);
    }
    else{
      title = args.join(" ");
    }

    console.log(message.member.voice + " requested lyrics for " + title);
    try {
      lyrics = await lyricsFinder(title, "");
      if (!lyrics) lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
    } catch (error) {
      lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("lyrics.embedTitle", { title: title }))
      .setDescription(lyrics)
      .setColor("#2600ff")
      
      if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;

    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
