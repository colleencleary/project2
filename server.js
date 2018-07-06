// __________________________
// Dependencies
// __________________________
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// __________________________
// Port
// __________________________
const port = process.env.PORT || 3000

//___________________
//Database
//___________________
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/project2_app';

//connect to this database - don't forget to start `mongod`
 mongoose.connect(mongoUri, { useNewUrlParser: true });

 // set the connection to const variable for easy access
 const db = mongoose.connection;

 //  use this fancy looking stuff to get more useful error messages in your console
 db.on( 'error' , console.error.bind( console , 'connection error: ' ));
 db.once ( 'open' , function () {
   console.log( 'DB: Connected' );
 });


// __________________________
// Routes
// __________________________
app.get('/', (req,res)=>{
  res.send('server is running');
});

// __________________________
// Listener
// __________________________
app.listen(port, ()=>{
  console.log('Listening...');
});
