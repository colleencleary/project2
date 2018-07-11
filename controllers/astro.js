// __________________________
// Dependencies
// __________________________
const express = require('express')
const router = express.Router()
const bodyParser = require ( 'body-parser' );
const session = require('express-session');
const methodOverride = require('method-override');
const Users = require('../models/users.js');
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
// go to forums
router.get('/forums', (req,res)=>{
  console.log(req.session.currentUser);
  res.render('forums.ejs', {
    currentUser: req.session.currentUser
  });
});



// edit user profile
router.get('/users/:id/edituser', (req,res)=>{
  Users.findById(req.params.id, (error, foundUser) => {
    res.render('edituser.ejs', {
      currentUser: req.session.currentUser
    });
  })
});

// edit user profile
router.get('/users/:id/editpersonal', (req,res)=>{
  Users.findById(req.params.id, (error, foundUser) => {
    res.render('editpersonal.ejs', {
      currentUser: req.session.currentUser
    });
  })
});



router.put('/users/:id', (req, res)=>{
    Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/astro/users/:id');
    });
});
// view profile
router.get('/users/:id', (req,res)=>{
  Users.findById(req.params.id, (error, foundUser) => {
    res.render('profile.ejs', {
      currentUser: req.session.currentUser
    });
  })
});
router.get('/thanks', (req,res)=>{
  res.render('thanks.ejs');
});



module.exports = router
