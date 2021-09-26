const TelegramApi = require('node-telegram-bot-api')

const api = '1979880668:AAHOt4SZEJ1tGdPiqRDy85KcVEgXH-eTDN4'

const bot = new TelegramApi(api, {polling: true})

const chats = {};
bot.setMyCommands([
    {command: '/start' , description: 'Starting bot'},
    {command: '/info' , description: 'Information about user'},
    {command: '/game' , description: 'Game for user'}
]) 

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text:"1", callback_data: '1'}, {text:"2", callback_data: '2'}, {text:"3", callback_data: '3'}],
            [{text:"4", callback_data: '4'}, {text:"5", callback_data: '5'}, {text:"6", callback_data: '6'}],
            [{text:"7", callback_data: '7'},{text:"8", callback_data: '8'},{text:"9", callback_data: '9'}],
            [{text:"0", callback_data: '0'}],

        ]
    })
}

const againOption = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Retry',callback_data:'/again'}]
        ]
    })
}
const startGame = async(chatId) => {
    await bot.sendMessage(chatId, 'i choose form 0 until 9')
    const random = Math.floor(Math.random()*10)
    chats[chatId] = random
    return bot.sendMessage(chatId, "find  number" , gameOptions)
}
const start = () => {
    bot.on('message',async msg => {


        const text= msg.text;
        const chatId = msg.chat.id;
        if( text === '/start'){
           await bot.sendSticker(chatId , 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/6.webp')
           return  bot.sendMessage(chatId , `Welcome to the bot `);
        }

        if(text === '/game'){
           return  startGame(chatId)
        }

        if( text === '/info') {
           return bot.sendMessage(chatId , `Your Username ${msg.from.first_name} `);
        }
        return bot.sendMessage(chatId, "Kiritilmagan buyruq")
    })   
    bot.on('callback_query', msg => {
        const data = msg.data
        const chatId = msg.message.chat.id;

        if(data === '/again'){
           return  startGame(chatId)
        }
        if(data == chats[chatId]) return bot.sendMessage(chatId , "Congratulations, You win")
        else return bot.sendMessage(chatId, 'You lose , play again' , againOption)
        bot.sendMessage(chatId, `Your chosed number ${data}`)
    })
}

start();