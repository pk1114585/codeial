const express = require('express');
const router = express.Router();
const passport= require('passport');


const userController= require('../controllers/user_controllers');
const postController= require('../controllers/post_controller');

router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post('/update/:id',passport.checkAuthentication, userController.update);
router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);
router.post('/create', userController.create);
//router.post('/createSession', userController.createSession);

// use passport as a middleware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
), userController.createSession);

router.get('/signout', userController.destroySession);

router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),userController.createSession);

module.exports= router;