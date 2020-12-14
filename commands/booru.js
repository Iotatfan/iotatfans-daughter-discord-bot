const { PREFIX } = require('../config/config')
const { addBooru } = require('../db/autoboorudb')
const { getChannel, scheduleBooru } = require('../utils')
const booru = require('./booru/booru')

const usage = 'booru'

module.exports = {
  name: 'Booru Image Search',
  usage: 'booru',
  description: `Search image from booru sites
                    **${PREFIX}${usage} [booru_tag] <lewd/safe>** 
                    **${PREFIX}${usage} auto [booru_tag] [channel] <lewd/safe>**`,
  execute (message, options, client) {
    console.log('Params ' + options)
    // Refactor Later
    const tags = options[0]
    let targetCh = null

    if (!options[2]) targetCh = message.channel.id
    else targetCh = options[2].startsWith('<#') ? getChannel.execute(options[2]) : message.channel.id

    const server = message.guild.id

    let sauce = options[3] != null ? options[3] : 'safe'

    if (options[1] === 'auto') {
      const values = [targetCh, tags, server, sauce]
      addBooru(values, (err, res) => {
        if (err) {
          console.log(err)
          message.channel.send('Searching images failed succesfully :(')
        } else {
          const data = res.rows
          scheduleBooru.execute(message, data, client, sauce)
          message.channel.send('Added to List')
        }
      })
    } else {
      sauce = options[1]
      booru.execute(message, targetCh, tags, client, sauce)
    }
  }
}