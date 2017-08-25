var router = require('express').Router();
var db = require('../database');
var googleMaps = require('./foreign-apis/google-maps');
var { getTrailsByLoc } = require('./foreign-apis/trails.js');

router.get('/currentUser', (req, res) => {
  res.send(req.user || null);
});

router.post('/posts', (req, res) => {
  var post = req.body.photo;
  db.createPost(req.user.email, post.trail_id, post.title, post.text, post.image_url, post.latitude, post.longitude)
  .then((post) => {
    res.end(JSON.stringify(post));
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

router.get('/posts/users/:useremail', (req, res) => {
  var userEmail = req.params.useremail;
  db.getPostsByUserEmail(userEmail).then((posts) => {
    res.end(JSON.stringify(posts));
  });
});

router.get('/posts/trails/:trailId', (req, res) => {
  let trailId = req.params.trailId;
  db.getPostsByTrailId(trailId).then((posts) => {
    res.end(JSON.stringify(posts));
  });
});

router.get('/trails', (req, res) => {
  let lat = `${req.query.lat || 34}`;
  let long = `${req.query.lng || -104}`;
  let radius = `${req.query.radius || 100}`;
  let limit = `${req.query.radius || 25}`;

  getTrailsByLoc(lat, long, radius, limit)
    .then(response => {
      console.log('sample data set:', response.data[0])
      response.data.forEach(trail => {
        db.createTrail(trail.id, trail.name, trail.intensity, trail.starting_trailhead.latitude, trail.starting_trailhead.longitude);
      });
      res.send(response.data)
    })
    .catch(err => console.log('error in api-router', err));
});

router.get('/*', (req, res) => {
  res.end('Invalid API request');
});

module.exports = router;
