const express = require('express');
const router =express.Router();
const passport=require('passport');
const postApi=require('../../../controllers/api/v1/post_api');

router.get('/',postApi.index);
router.get('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);
module.exports=router;