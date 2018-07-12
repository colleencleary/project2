const express = require('express')
const router = express.Router()
const moment = require('moment');

const Posts = require('../models/posts.js');
const User = require('../models/users.js');

// go to forums
router.get('/', (req,res)=>{
  // console.log(req.session.currentUser);
	Posts.find({}).sort({ date: -1}).find({board: 'Welcome'}, (err, welcomePosts)=>{
		Posts.find({}).sort({ date: -1}).find({board: 'Ask/Offer'}, (err, advicePosts)=>{
			Posts.find({}).sort({ date: -1}).find({board: 'Water Cooler'}, (err, watercoolerPosts)=>{
				res.render('forums.ejs', {
					welcomePosts: welcomePosts,
					advicePosts: advicePosts,
					watercoolerPosts: watercoolerPosts,
					moment: moment,
					currentUser: req.session.currentUser
				});
				});
			});
		});

});

router.get('/new', (req, res)=>{
	res.render('forums/new.ejs', {
    currentUser: req.session.currentUser
  });
});

router.post('/', (req, res)=>{
	console.log(req.body);
		req.body.author = req.session.currentUser.username
		if(req.body.anonymous === 'on'){
        req.body.anonymous = true;
    } else {
        req.body.anonymous = false;
    }
    Posts.create(req.body, (err, createdPost) => {
			res.redirect('/astro/forums')
		})
});

// go to forums/welcome
router.get('/welcome', (req,res)=>{
  Posts.find({}).sort({ date: -1}).find({board: 'Welcome'}, (err, foundPosts)=>{
		// console.log(foundPosts);
		res.render('forums/welcome.ejs', {
			posts: foundPosts,
			moment: moment,
			currentUser: req.session.currentUser
			});
		});
});

// go to forums/advice
router.get('/advice', (req,res)=>{
	Posts.find({}).sort({ date: -1}).find({board: 'Ask/Offer'}, (err, foundPosts)=>{
		// console.log(foundPosts);
		res.render('forums/advice.ejs', {
			posts: foundPosts,
			moment: moment,
			currentUser: req.session.currentUser
			});
		});
});

// go to forums/watercooler
router.get('/watercooler', (req,res)=>{
	Posts.find({}).sort({ date: -1}).find({board: 'Water Cooler'}, (err, foundPosts)=>{
		// console.log(foundPosts);
		res.render('forums/watercooler.ejs', {
			posts: foundPosts,
			moment: moment,
			currentUser: req.session.currentUser
			});
		});
});

//show forum post
router.get('/:id', (req, res)=>{
    Posts.findById(req.params.id, (err, foundPost)=>{
			console.log(foundPost);
            res.render('forums/show.ejs', {
                post: foundPost,
								moment: moment,
								currentUser: req.session.currentUser
        })
    });
});

// delete post
router.delete('/:id', (req, res)=>{
    Posts.findByIdAndRemove(req.params.id, ()=>{
                res.redirect('/astro/forums');
    });
});

// edit
// router.get('/:id/edit', (req, res)=>{
// 	Posts.findById(req.params.id, (err, foundPost)=>{
// 		User.find({}, (err, allUsers)=>{
// 			User.findOne({'posts._id':req.params.id}, (err, foundPostUser)=>{
// 				res.render('posts/edit.ejs', {
// 					post: foundPost,
// 					authors: allUsers,
// 					postUser: foundPostUser
// 				});
// 			});
// 		});
// 	});
// });

// update
// router.put('/:id', (req, res)=>{
//     Posts.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost)=>{
//         User.findOne({ 'posts._id' : req.params.id }, (err, foundUser)=>{
// 			if(foundUser._id.toString() !== req.body.authorId){
// 				foundUser.posts.id(req.params.id).remove();
// 				foundUser.save((err, savedFoundUser)=>{
// 					User.findById(req.body.authorId, (err, newUser)=>{
// 						newUser.posts.push(updatedPost);
// 						newUser.save((err, savedNewUser)=>{
// 			                res.redirect('/posts/'+req.params.id);
// 			            });
// 					});
// 	            });
// 			} else {
// 				foundUser.posts.id(req.params.id).remove();
// 	            foundUser.posts.push(updatedPost);
// 	            foundUser.save((err, data)=>{
// 	                res.redirect('/'+req.params.id);
// 	            });
// 			}
//         });
//     });
// });

module.exports = router
