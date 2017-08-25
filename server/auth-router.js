var router = require('express').Router();
var passport = require('passport');

// Middleware to check if a user is authenticated
let isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};
// Middleware to check if a user is NOT authenticated
let isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
};

// Needed for Google OAuth
router.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_friends'] }));

//re-ask about any declined permissions when authenticating
router.get('/auth/facebook',
  passport.authenticate('facebook', { authType: 'rerequest', scope: 'user_friends' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

// Destroys current OAuth session
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// User cannot login if they are already logged in
router.get('/login', isNotLoggedIn);

// Redirect any pages here back to login
router.get('/upload', isLoggedIn);
router.get('/profile', isLoggedIn);

module.exports = router;
