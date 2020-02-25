const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')


const app = express();

const getNews = require('./lib/getNews');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.get('/', (req, res) =>{ 
    res.render('index');
});
app.get('/about', (req, res)=>{
    res.render('about')
});
app.get('/contact', (req, res)=>{
    res.render('contact')
})



app.post('/', async(req, res)=>{
    let broadcaster = req.body.broadcaster
    let newsTitle = req.body.title
    //the above relates to the form and the bellow variables are getting information form the api
    // console.log(broadcaster)
    // console.log(newsTitle)
    let data = await getNews(broadcaster, newsTitle);
    
    // console.log(JSON.stringify(data))
    console.log(newsTitle)
    // let caster = data.sources.name
    // let title = data.sources.description
    // const functionToFilterName = function(name){
    //     return name;
    // };
    let searchresults =[]
    for (i=0; i < data.sources.length; i++) {
        if(data.sources[i].name.includes(broadcaster)){//if data.sources[i].name includes what i type on the broadcaster input
            searchresults.push({
                name: data.sources[i].name, 
                description: data.sources[i].description,
            });   
        }
    }
console.log(searchresults)  
        
res.render('index', {data:{searchresults}});
});
app.listen(3001, () =>{
    console.log('server is running on port 3001');
    // console.log(__dirname);
});