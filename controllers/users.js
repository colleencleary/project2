const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const methodOverride = require('method-override')

const User = require('../models/users.js');
router.use(methodOverride('_method'));


router.get('/new', (req, res) => {
  res.render('users/new.ejs')
})

// edit user profile
router.get('/:id/edituser', (req,res)=>{
  User.findById(req.params.id, (error, foundUser) => {
    res.render('edituser.ejs', {
      currentUser: req.session.currentUser
    });
  })
});

// edit user profile
router.get('/:id/editpersonal', (req,res)=>{
  User.findById(req.params.id, (error, foundUser) => {
    res.render('editpersonal.ejs', {
      currentUser: req.session.currentUser
    });
  })
});

// view profile
router.get('/:id', (req,res)=>{
  User.findById(req.params.id, (error, foundUser) => {
    res.render('profile.ejs', {
      currentUser: req.session.currentUser
    });
  })
});


router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
      User.find((err, users) => {
        console.log(users);
        res.redirect('/astro/thanks');
    });
    });
});

router.delete('/:id', (req, res)=>{
	User.findByIdAndRemove(req.params.id, ()=>{
		res.render('index.ejs');
	});
});

router.put('/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, ()=>{
      console.log(req.session.currentUser);
      res.redirect('/astro/forums');
    });
});

module.exports = router
