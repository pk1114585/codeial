const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

// tell passport to use a new strategy for google auth
passport.use(new googleStrategy(
    {
    clientID: '588574813360-elaja62tsbf452sdcveu25hvgdsm5qq2.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback',
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            // find a user
            let user = await User.findOne({ email: profile.emails[0].value }).exec();
            console.log(profile);
            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create the user and set it as req.user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null, user);
            }
        } catch (err) {
            console.log('error in google strategy-passport', err);
            return done(err);
        }
    }
));

module.exports=passport;