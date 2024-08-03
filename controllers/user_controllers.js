const User = require('../models/user');
// let's keep it same as before
module.exports.profile = async function(req, res) {
    try {
        let user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};



module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeal | sign Up'
    });
}

module.exports.update = async function (req, res) {

    console.log('user_controller line 29',req.body);
    try {
    if(req.user.id == req.params.id){
        let userUpdate = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Options to return the updated document and validate the update
        );
        return res.redirect('/');
    }else{
        res.status('401').send('Unauthorization');
        console.log('user_controller line 37');
    }
   }catch(err){
    console.log(err);
   }
   
}

module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Codeal | sign in'
    });
}

// get the sign up data 

module.exports.create = async function (req, res) {
    console.log(req.body);
    try {
        if (req.body.password !== req.body.confirm) {
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            user = await User.create(req.body);
            return res.redirect('/users/signin');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in user sign-up:', err);
        return res.redirect('back');
    }
};

module.exports.createSession = function (req, res) {
   /*  console.log(req.body);
    const email= User.findOne({email: req.body.email});
    const pass= User.findOne({password: req.body.password});
    console.log(email+''+ pass);
    if(email == req.body.email && pass == req.body.password){
        console.log('login successfully');
        return res.render('user_profile');
    } */
   // using passport for sign in
   return res.redirect('/');
 } 

 module.exports.destroySession= function(req, res){
    req.logout(function(err){
        if(err){
            console.log('something geeting err while signout');
        }
    });
    return res.redirect('/');
 }