const expect = require('chai').use(require('chai-as-promised')).expect;
let helpers = require('../client/src/helpers/helpers.js');

module.exports.run = function() {
  describe('grabPhofilePhoto()', () => {
    it('Should retrieve user data from google API', () => {
      return helpers.grabPhofilePhoto()
      .then((user) => {
        console.log(user);
        expects(user.image.url).to.equal('https://lh3.googleusercontent.com/-eX78f2bzxZQ/AAAAAAAAAAI/AAAAAAAAACM/rgj_RtCwIL4/photo.jpg?sz=50');
        expects(user.name.familyName).to.equal('Stieber');
        expects(user.name.givenName).to.equal('Jason');
      });
    });
  });
};
