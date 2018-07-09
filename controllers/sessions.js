const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/users.js');

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect('/astro/forums');
    } else {
      res.render('sessions/retry.ejs');
    }
  });
});

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
})

module.exports = router;
