// __________________________
// Dependencies
// __________________________
const express = require('express')
const router = express.Router()
const bodyParser = require ( 'body-parser' );
const session = require('express-session');
const methodOverride = require('method-override');
const Users = require('../models/users.js');
const Posts = require('../models/posts.js');
//___________________
// Middleware
//___________________
router.use(session({
    secret: "soletsgonowhere", //some random string
    resave: false,
    saveUninitialized: false
}));
router.use(express.urlencoded({extended:false}));
router.use(methodOverride('_method'));


//___________________
//Controllers
//___________________
const usersController = require('./users.js');
const sessionsController = require('./sessions.js');
const postsController = require('./posts.js');

router.use('/users', usersController);
router.use('/sessions', sessionsController);
router.use('/forums', postsController);
// __________________________
// Routes
// __________________________
router.get('/', (req,res)=>{
  if(typeof(req.session.currentUser) != 'undefined') {
  res.redirect('/astro/forums');
  } else {
    res.render('index.ejs');
  }
});

// go to forums/welcome
router.get('/forums/welcome', (req,res)=>{
  console.log(req.session.currentUser);
  res.render('forums/welcome.ejs', {
    currentUser: req.session.currentUser
  });
});

// go to forums/advice
router.get('/forums/advice', (req,res)=>{
  console.log(req.session.currentUser);
  res.render('forums/advice.ejs', {
    currentUser: req.session.currentUser
  });
});

// go to forums/watercooler
router.get('/forums/watercooler', (req,res)=>{
  console.log(req.session.currentUser);
  res.render('forums/watercooler.ejs', {
    currentUser: req.session.currentUser
  });
});
// go to forums
router.get('/forums', (req,res)=>{
  console.log(req.session.currentUser);
  res.render('forums.ejs', {
    currentUser: req.session.currentUser
  });
});

// go to events
router.get('/events', (req,res)=>{
  console.log(req.session.currentUser);
  res.render('events.ejs', {
    currentUser: req.session.currentUser
  });
});

router.get('/thanks', (req,res)=>{
  res.render('thanks.ejs');
});



module.exports = router
