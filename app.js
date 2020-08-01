const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');



app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'yasuo-session',
    keys: ['key1', 'key2']
}));

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

// set up view engine
app.set('view engine', 'ejs');

// set up routes
app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/fail' }),
  function(req, res) {
      //success
    res.redirect('/good');
  });

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/good', isLoggedIn, (req, res) => {
    res.json(req.user);
})

app.get('/fail', (req, res) => {
    res.send('Fail');
})

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('app running on port 3000');
});