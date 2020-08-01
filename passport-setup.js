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
        "457714721554-674j6kitq0m2dm7lmrarioikrljqpmun.apps.googleusercontent.com",
      clientSecret: "ZPGYpoSxWFDdNiPsaJmhj3VN",
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  )
);
