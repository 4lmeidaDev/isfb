const submit = (sub, e, o) => {
  let dups = 0;
  sub.forEach(s => {
    if (!check(s, e)) return dups++
    if (!s) return
    e.inc('count')
    e.set(e.get('count') + 1, {
      type: "black",
      owner: o,
      value: s
    });
  });
  return dups
};
const check = (v, e) => {
  let f = v.toLowerCase().trim().replace(/_/g, "").replace(/\./g, "").replace(/\?/g, "").replace(/!/g, "");
  let exists = e.find(p => p.type == 'black' && p.value.toLowerCase().trim().replace(/_/g, "").replace(/\./g, "").replace(/\?/g, "").replace(/!/g, "") === f);
  return !exists
};

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.reply("please put your submission.");
  let submissions = args.join(" ").split("\n");
  let r = submit(submissions, client.cards, message.author.id);
  let m = `I've submitted your card${submissions.length == 1 ? '' : 's'}.`
  if(r) m =`${submissions.length == r ? 'all ' : ''}${r} ${submissions.length == 1 ? 'submisson' : 'of your submissions'} was flagged as a duplicate${r.length == 1 ? '' : 's'} and not submitted!`
  if(submissions.length - r && r) m +=` I've submitted the other ${submissions.length - r} submission${submissions.length - r == 1 ? '' : 's'}.`
  message.reply(m)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  hidden: false
};

exports.help = {
  name: "black",
  category: "Islands Against Jwiggs",
  description:
    "Submit a black card. Several can be submitted by seperating them with a new line.",
  usage: "black [submissons]"
};
