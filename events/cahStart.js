function getCard(id) {
  let cards = client.game.get(id, 'white')
  if (!cards) return;
  let value = client.Rnd(0, cards.length)
  let card = cards[value]
  client.game.set(id, cards.filter((c, i) => i != value), 'white')
  return card
}
module.exports = async (client, id) => {
  let games = client.game
  let game = games.get(id)
  if (!game) return console.warn(`Something tried starting game ${id} but it doesn't exist.`)
  if (game.state != 'waiting') return console.warn(`Something tried starting game ${id} but it isn't waiting.`)
  game.players.forEach(p => {
    /*{
      id,
      points: 0,
      cards: [],
    }*/
    for (let i = 0; i < 8; i++)
      p.cards.push(getCard())
  })
  games.set(id, game.players, 'players')
  games.set(id, 'starting', 'state')

};
