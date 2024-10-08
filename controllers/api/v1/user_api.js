const User=require('../../../models/user');
const jsonWebToken=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try{
   let user=await User.findOne({email: req.body.email});
   if(!user|| user.password!= req.body.password){
    return res.status(400).json({message: 'Invalid email or password'});
   }
   return res.json(200, {
    message:'Sign in successful, here is your token',
    data:{
        token: jsonWebToken.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
    }
   })
    
    }catch(err){
        console.log('*****',err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}