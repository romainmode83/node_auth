const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt')

const verifyCallback = (username, password, done) => {
    User.findOne({ email: username}, (err, user) => {
        if (err) {
            return done(err, {message : 'No email'});
        }
        if (!user) {
            return done(null, false, {message: 'Email incorrect'})
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              return done(null, user)
            } else {
              return done(null, false, { message: "Incorrect password" })
            }
          })
    })
}

passport.use(
    new LocalStrategy(({usernameField: 'email'}), verifyCallback ));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });