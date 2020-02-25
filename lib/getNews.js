const fetch = require('node-fetch');

require('dotenv').config()


async function getNews(name, description){
    const url = `http://newsapi.org/v2/sources?q=${name},${description}&apiKey=${process.env.APPID}`
    let data = await fetch(url, {method: 'GET'});
    // console.log(data)
    return await data.json();

}


module.exports = getNews;