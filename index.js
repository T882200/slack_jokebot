const SlackBot = require('slackbots');
const axios = require('axios');


const bot = new SlackBot({
  token: 'xoxb-417697054161-418432826901-rSnxCIxkSTtsaXnGKmfvenqj',
  name: 'jokebot',
});

// Start handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:',
  }

  bot.postMessageToChannel('general', 'Get Ready To Laugh With @Jokebot', params);
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message handler
bot.on('message', (data) => {
  if(data.type !== 'message'){
    return;
  }

  handleMessage(data.text);
});

// Response to Data
function handleMessage(message) {
  if(message.includes(' chucknorris')){
    chuckJoke();
  }else if(message.includes(' yomama')){
    yomamaJoke();
  }else if(message.includes(' random')){
    randomJoke();
  }else if(message.includes(' help')){
    help();
  }
}

// Tell a Chuck Norris Joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random')
  .then(res => {
    const joke = res.data.value.joke;
    
    const params = {
      icon_emoji: ':laughing:',
    }
  
    bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
  });
}

// Tell a yomamma Joke

function yomamaJoke() {
  axios.get('http://api.yomomma.info/')
  .then(res => {
    const joke = res.data.joke;
    
    const params = {
      icon_emoji: ':laughing:',
    }
  
    bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
  });
}

// Tell a random joke
function randomJoke() {
  const rand = Math.floor(Math.random()*2) +1;
  (rand === 1) ? chuckJoke() : yomamaJoke();
}

// Show help
function help() {
  const params = {
    icon_emoji: ':question:',
  }

  bot.postMessageToChannel('general', `Type @jokebot with either 'chucknorris', 'yomama' or 'random' to get a joke`, params);
}