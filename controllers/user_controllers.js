const User = require('../models/user');
module.exports.profile = function (req, res) {
    return res.render('users', {
        title: 'Profile',
        name: 'Pradeep'
    });
}

module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Codeal | sign Up'
    });
}

module.exports.signIn = function (req, res) {
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
    console.log(req.body);
    const email= User.findOne({email: req.body.email});
    const pass= User.findOne({password: req.body.password});
    console.log(email+''+ pass);
    if(email == req.body.email && pass == req.body.password){
        console.log('login successfully');
        return res.render('user_profile');
    }
 }