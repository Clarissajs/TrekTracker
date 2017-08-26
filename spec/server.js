const server = require('../server/index.js');
const chai = require('chai');
const { expect } = require('chai');
const chaiHTTP = require('chai-http');

const should = chai.should();
chai.use(chaiHTTP);

const xdescribe = () => {};

module.exports.run = () => {
  
  // Server test goes here

  describe('Travis', () => {

    it('Should run tests.', (done) => {
      done();
    })

  })
}


