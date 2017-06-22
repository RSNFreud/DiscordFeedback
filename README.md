# DiscordFeedback
The bot that powers the Discord Feedback server

# Install
If you have npm you can install the bot very easily, just run
```
npm i
```
in the repository root and

```npm run-script dbcreate
```

You will also need [rethinkdb](https://www.rethinkdb.com/) by downloading it and running it from command prompt

Before running the bot there is a few items to be replaced, they are as follows, replace the uservoice details with your info, the discord bot token, and role ids (from the server that you are wanting to run the bot in, you need to make sure you have these roles added to your user or else you wouldn't be able to use the bot!) in the config.js file
.

# Run
You can run the bot just as easliy as you can install it, just run

```
npm start
```
in the repository root

If you are getting a bunch of errors in console, make sure that rethinkdb is running
