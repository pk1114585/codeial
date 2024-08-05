const User = require('../models/user');
const fs=require('fs');
const path=require('path');
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

module.exports.update = async function (req, res) 
{
    if (req.user.id === req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            if (!user) {
                req.flash('error', 'User not found');
                return res.redirect('back');
            }
    
            User.uploadedAvatar(req, res, async function(err) {
                if (err) {
                    console.log('*****Multer Error:', err);
                    req.flash('error', 'Error uploading avatar');
                    return res.redirect('back');
                }
    
                user.name = req.body.name;
                user.email = req.body.email;
    
                if (req.file) {
                    if (user.avatar) {
                        try {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        } catch (err) {
                            if (err.code !== 'ENOENT') {
                                console.error('Error deleting old avatar:', err);
                                req.flash('error', 'Error updating profile');
                                return res.redirect('back');
                            }
                        }
                    }
    
                    // Save path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
    
                await user.save();
                req.flash('success', 'Profile Updated Successfully');
                return res.redirect('/');
            });
        } catch (err) {
            console.error('Error finding user:', err);
            req.flash('error', 'Error updating profile');
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized access');
        return res.redirect('back');
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
   req.flash('success','Logged in successfully');
   return res.redirect('/');
 } 

 module.exports.destroySession= function(req, res){
    req.logout(function(err){
        if(err){
            console.log('something geeting err while signout');
        }
       
    });
    req.flash('success','You have logged Out!');
    return res.redirect('/');
 }