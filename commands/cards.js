const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {
const embed = new Discord.RichEmbed()
.setTitle('Card Stats')
.addField('Total Cards:', client.cards.count)
.addField('Black Cards:', client.cards.filter(c => c.type == 'black').size)
.addField('White Cards:', client.cards.filter(c => c.type == 'white').size)
.addField('Your Cards:', client.cards.filter(c => c.owner == message.author.id).size)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  hidden: false
};

exports.help = {
  name: "cards",
  category: "Islands Against Jwiggs",
  description: "See how many cards there are for the server's IIslands Against Jwiggs competiton.",
  usage: "ping"
};