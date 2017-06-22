# DiscordFeedback
The bot that powers the Discord Feedback server

# Selfhosting
We don't (fully) support hosting your own copy of DiscordFeedback, this program is highly customized and not suited to run outside of the official Discord Feedback server.

However, if you do want to run an instance, you need the following:

- UserVoice API keys
- Discord bot account
- [RethinkDB](https://www.rethinkdb.com)
- Discord server (duh)
  - Server **must** have channels named `bot-log`, `admin-queue` and `bot-error`, and the bot **must** have write access to this channel.
  
## Config creation
Config creation is pretty straightforward, all values given in the example config file (`config.example.js`) are placeholders, replace them with your own data and save the file as `config.js` in the project root.

## Database initialization
Run `npm run-script dbcreate` in the project root to initialize RethinkDB with the required tables.

## Starting
Run `npm start`, please note there will be little to no console output, this program is highly reliant on [Bugsnag](http://bugsnag.com) for error reporting.
