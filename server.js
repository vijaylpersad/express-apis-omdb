require('dotenv').config();
const axios = require('axios')
const express = require('express');
require('dotenv').config()
const ejsLayouts = require('express-ejs-layouts');
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  //res.send('Hello, backend!');
  res.render('index.ejs')
});


//GET request --use query strings -- req.query
app.get('/results', (req,res)=>{
    
  const url = `http://www.omdbapi.com/?t=${req.query.q}&apikey=${process.env.OMDB_API_KEY}`
  console.log(url)

  axios.get(url)
  .then(response => {
    console.log(response)   // works to see movie details in console 
    res.render('results.ejs', results)
  })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
