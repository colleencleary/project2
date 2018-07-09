// WOMEN OF STEM: Astronomy
// __________________________
// Dependencies
// __________________________
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bodyParser = require ( 'body-parser' );
const session = require('express-session');
const app = express()

// app.use(session({
//     secret: "soletsgonowhere", //some random string
//     resave: false,
//     saveUninitialized: false
// }));

// __________________________
// Port
// __________________________
const port = process.env.PORT || 3000
// const port = 3000

//___________________
//Database
//___________________
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/'+'astro';

// Connect
// const mongoURI = 'mongodb://localhost:27017/'+'project2';
mongoose.connect(mongoUri, { useNewUrlParser: true });

// Error / success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoUri));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on( 'open' , ()=>{
  console.log('Connection made!');
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
app.use( bodyParser.json() );
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
