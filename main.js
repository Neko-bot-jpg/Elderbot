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

client.on("message", message => {
  if (message.content.startsWith("$ban")) {
    // Easy way to get member object though mentions.
    var member = message.mentions.members.first();
    // ban
    member
      .ban()
      .then(member => {
        // Successmessage
        message.channel.send(
          ":wave: " +
            member.displayName +
            " a été banni avec succès  :point_right: "
        );
      })
      .catch(() => {
        // Failmessage
        message.channel.send("Accès refuser");
      });
  }
});
