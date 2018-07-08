// __________________________
// Dependencies
// __________________________
const express = require('express')
const router = express.Router()

//___________________
//Controllers
//___________________
const usersController = require('./users.js');

//___________________
// Middleware
//___________________
router.use('/users', usersController);
router.use(express.urlencoded({extended:false}));


// __________________________
// Routes
// __________________________
router.get('/', (req,res)=>{
  res.render('index.ejs');
});



module.exports = router
