module.exports = {
  name: 'Help',
  usage: 'help',
  description: 'List of useful command',
  execute (message, options, client) {
    const commandsArray = client.commands.array()

    const toSend = {
      embed: {
        title: 'Command List',
        color: '00FF00',
        fields: []
      }
    }

    commandsArray.forEach((command) => {
      if (command.name !== 'Help') {
        toSend.embed.fields.push({
          name: `${command.name}`,
          value: `${command.description}`
        })
      }
    })

    message.channel.send(toSend)
  }
}
