const User = require('../models/user');
module.exports.profile = async function (req, res) {
    try {
        if (req.cookies.user_id) { // Corrected req.cookie to req.cookies
            let user = await User.findById(req.cookies.user_id); // Corrected user_Id to user_id
            if (user) {
                return res.render('user_profile', {
                    title: 'Profile',
                    user: user
                });
            }
            return res.redirect('/users/signIn');
        } else {
            return res.redirect('/users/signIn');
        }
    } catch (err) {
        console.log('Error in user profile:', err); // Corrected the error message
        return res.redirect('back');
    }
};

module.exports.home = function (req, res) {
    return res.render('home', {
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

// Sign In
module.exports.createSession = async function (req, res) {
    console.log(req.body);
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            res.cookie('user_id', user._id);
            console.log('77 line of sign in');
            return res.redirect('/users/profile');
        }
        else {
            console.log('User not found');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in user sign-up:', err);
        return res.redirect('back');
    }
}