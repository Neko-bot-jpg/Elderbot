const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });

client.on("ready", () => {
  console.log("Je suis prêt !");
});

client.on("message", msg => {
  if (msg.content.startsWith(`${PREFIX}ping`)) msg.channel.send("Pong ! :yum:");
});

client.login(TOKEN);

client.on("message", message => {
  if (!message.guild) return;

  if (message.content.startsWith("!kick")) {
    const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.member(user);

      if (member) {
        member
          .kick("Optional reason that will display in the audit logs")
          .then(() => {
            message.reply(`Coup de pied réussi ${user.tag}`);
          })
          .catch(err => {
            message.reply("Je suis incapable de frapper le membre");

            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("Il n'y as aucun mention pour kick !");
    }
  }
});

const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
  let cMS = convertMS(client.uptime);
  let uptime =
    cMS.d +
    " days : " +
    cMS.h +
    " hours : " +
    cMS.m +
    " minutes : " +
    cMS.s +
    " seconds";

  const uptimeEmbed = new Discord.RichEmbed()
    .setColor(`#f395ea`)
    .addField(`Le bot est en ligne depuis`, `${uptime}`)
    .setFooter(">>Footer<<");

  message.channel.send(uptimeEmbed);
  message.delete();
};

function convertMS(ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return {
    d: d,
    h: h,
    m: m,
    s: s
  };
}

module.exports.help = {
  name: "uptime",
};