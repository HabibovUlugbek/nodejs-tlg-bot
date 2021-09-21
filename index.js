const TelegramApi = require('node-telegram-bot-api')

const api = '1979880668:AAHOt4SZEJ1tGdPiqRDy85KcVEgXH-eTDN4'

const bot = new TelegramApi(api, {polling: true})

bot.on('message', msg => {
    const text= msg.text;
    const chatId = msg.chat.id;
    bot.sendMessage(chatId , "Welcome to the bot");
})