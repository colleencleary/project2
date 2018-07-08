// WOMEN OF STEM: Astronomy
// __________________________
// Dependencies
// __________________________
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bodyParser      = require ( 'body-parser' );
const app = express()

// __________________________
// Port
// __________________________
const port = process.env.PORT || 3000
// const port = 3000

//___________________
//Database
//___________________
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/project2_app';

 mongoose.connect(mongoUri, { useNewUrlParser: true });
 const db = mongoose.connection;
 db.on( 'error' , console.error.bind( console , 'connection error: ' ));
 db.once ( 'open' , function () {
   console.log( 'DB: Connected' );
 });

 //___________________
 //Controllers
 //___________________
const astroController = require('./controllers/astro.js')

//___________________
// Middleware
//___________________
app.use( express.static ( 'public' ) );
app.use( methodOverride( '_method' ) );
app.use( bodyParser.urlencoded( { extended : false } ) );
// app.use( bodyParser.json() );
app.use('/astro', astroController)

// __________________________
// Routes
// __________________________
app.get('/', (req,res)=>{
  res.redirect('/astro');
});

// app.get('/astro', (req,res)=>{
//   res.render('index.ejs');
// });

// __________________________
// Listener
// __________________________
app.listen(port, ()=>{
  console.log('Listening...');
});
