let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let users = require('../database/models.js').users;
let config;

// load the FB authorization variables
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'test') {
  config = require('./config.json').facebookAuth;
}

module.exports = (passport) => {
  passport.use(new FacebookStrategy(
    // pull in app id and secret from passport config.json file
    {
      clientID: process.env.FACEBOOK_CLIENT_ID || config.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || config.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || config.CALLBACK_URL,
      scope: ['user_friends'],
      profileFields: ['id', 'emails', 'photos', 'name', 'friends'], //will only get friends that have the app installed
      // Secure API call by adding proof of the app secret.  This is required when
      // the "Require AppSecret Proof for Server API calls" setting has been
      // enabled.  The proof is a SHA256 hash of the access token, using the app
      // secret as the key.
      enableProof: true
    },
    // Facebook sends back the token and profile info, standardized by Passport
    (request, token, refreshToken, profile, done) => {
      // asynchronous
      process.nextTick(() => {
        console.log('Facebook profile is', profile);
        users.findOne(
          {
            where: {
              email: profile.emails[0].value
            }
          }
        ).then((user) => {
          if (user) {
            return done(null, user);
          } else { // set all FB info in users
            // Note: Jason can get the thumbnail photo via: profile.photos[0].value;
            var newUser = new users();
            newUser.id = profile.id;
            //newUser.token = token;
            newUser.firstname = profile.name.givenName;
            newUser.lastname = profile.name.familyName;
            newUser.email = profile.emails[0].value;
            newUser.save((err) => {
              if (err) {
                console.log('Facebook newUser save err is', err);
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
    done(null, null);
  });
};
