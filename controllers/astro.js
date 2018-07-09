// __________________________
// Dependencies
// __________________________
const express = require('express')
const router = express.Router()
const bodyParser = require ( 'body-parser' );
const session = require('express-session');
const methodOverride = require('method-override');

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

router.use('/users', usersController);
router.use('/sessions', sessionsController);

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

router.get('/forums', (req,res)=>{
  res.render('forums.ejs', {
    currentUser: req.session.currentUser
  });
});

router.get('/thanks', (req,res)=>{
  res.render('thanks.ejs');
});


module.exports = router
