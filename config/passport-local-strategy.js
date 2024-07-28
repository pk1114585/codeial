const User = require('../models/user');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({
    usernameField: 'email'
},
    async function (email, password, done) {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                console.log('Error in finding user --> Passport');
                return done(null, false, { message: 'Invalid Username/password' });
            }

            if (user.password !== password) {
                console.log('Invalid Username/password');
                return done(null, false, { message: 'Invalid Username/password' });
            }

            return done(null, user);
        } catch (err) {
            console.log('Error in authentication --> Passport');
            return done(err);
        }
    }
));

// serializing the to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user form the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});

// check if the user is authenticated 
passport.checkAuthentication= function(req,res, next){
    //if the user is signed in , then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/signin');
}

passport.setAuthentication = function (req, res, next) {
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports= passport;