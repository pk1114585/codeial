const express = require('express');
const router = express.Router();


const userController= require('../controllers/user_controllers');

router.get('/profile', userController.profile);
router.get('/home', userController.home);
router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);
router.post('/create', userController.create);
router.post('/createSession', userController.createSession);


module.exports= router;