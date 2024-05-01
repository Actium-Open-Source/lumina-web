require('dotenv').config();

const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_PASSPORT_CLIENT_ID,
        clientSecret: process.env.GOOGLE_PASSPORT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});