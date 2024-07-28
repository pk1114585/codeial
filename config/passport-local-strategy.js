const User = require('../models/user');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        const user = User.findOne({ email: email });
        if (!user) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
         if(!user || user.password != password){
            console.log('Invalid Username/password ');
            return done(null, false);
         }
         return done(null, user);
        
    }

));

// serializing the to decide which key is to be kept in the cookies
paasport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user form the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if(err)
        {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
       return done(null, user);
    });
});

module.exports= passport;