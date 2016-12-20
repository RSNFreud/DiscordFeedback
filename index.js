const Discordie = require('discordie')
const UserVoice = require('uservoice-nodejs')
const bot = new Discordie({
  autoReconnect: true
})
const Events = Discordie.Events
const Config = require('./config.js')
const Commands = require('./Utils/command_engine').Commands
const AccessChecker = require('./Utils/access_checker')

// UserVoice API V2 Variables
var v2Client = new UserVoice.ClientV2({
  clientId: Config.uservoice.key,
  subdomain: Config.uservoice.subdomain
})

// UserVoice API V1 Variables
var uvClient = new UserVoice.Client({
  subdomain: Config.uservoice.subdomain.trim(),
  domain: Config.uservoice.domain.trim(),
  apiKey: Config.uservoice.key.trim(),
  apiSecret: Config.uservoice.secret.trim()
})

// Discord bot stuffs
bot.Dispatcher.on(Events.MESSAGE_CREATE, (c) => {
  if (c.message.content.indexOf(Config.prefix) === 0 || c.message.content.indexOf(bot.User.mention) === 0) {
    var cmd = c.message.content.substr(Config.discord.prefix.length).split(' ')[0].toLowerCase()
    var suffix
    suffix = c.message.content.substr(Config.discord.prefix.length).split(' ')
    suffix = suffix.slice(1, suffix.length).join(' ')
    var msg = c.message
    if (Commands[cmd]) {
      AccessChecker.getLevel(msg.member, (level) => {
        if (level === 0 && Commands[cmd].adminOnly === true || level === 0 && Commands[cmd].modOnly === true) {
          msg.reply('this command is restricted, and not available to you.')
          return
        }
        if (level === 1 && Commands[cmd].adminOnly === true) {
          msg.reply('sorry, only admins can use this command.')
          return
        }
        try {
          Commands[cmd].fn(bot, msg, suffix, UserVoice, uvClient, Config)
        } catch (e) {
          console.error(e)
          msg.reply('an error occured while proccessing this command, the admins have been alerted, please try again later')
        }
      })
    } else {
      msg.reply('No such command, sorry. :cry:')
    }
  }
})

bot.Dispatcher.on(Events.GATEWAY_READY, () => {
  console.log('Feedback bot is ready!')
})

bot.Dispatcher.on(Events.DISCONNECTED, (e) => {
  console.error('Connection to Discord has been lost... Delay till reconnect:', e.delay)
})

bot.Dispatcher.on(Events.GATEWAY_RESUMED, () => {
  console.log('Reconnected.')
})

bot.connect({
  token: Config.token
})