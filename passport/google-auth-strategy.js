let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let users = require('../database/models.js').users;
let config;

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'test') {
  config = require('./config.json').facebookAuth;
}

module.exports = (passport) => {
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID || config.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || config.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || config.CALLBACK_URL,
      passReqToCallback: true,
      profileFields: ['id', 'emails', 'name']
    },
    (request, token, refreshToken, profile, done) => {
      process.nextTick(() => {
        console.log('profile is', profile);
        users.findOne(
          {
            where: {
              id: profile.id
            }
          }
        ).then((user) => {
          if (user) {
            return done(null, user);
          } else {
            var newUser = new users();
            newUser.id = profile.id;
            //newUser.token = token;
            newUser.firstname = profile.name.givenName;
            newUser.lastname = profile.name.familyName;
            newUser.email = profile.emails[0].value;
            newUser.save((err) => {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        }).catch((err) => {
          return done(err);
        });
      });
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
