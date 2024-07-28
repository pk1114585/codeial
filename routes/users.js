const express = require('express');
const router = express.Router();
const passport= require('passport');


const userController= require('../controllers/user_controllers');

router.get('/profile',passport.checkAuthentication, userController.profile);
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

module.exports= router;