const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "",
      clientSecret: "",
      callbackURL: "",
    },
    function (token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  )
);
