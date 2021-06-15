
//const expect = chai.expect;
//import play from './books';
//const { searchAPI, play } = require('./books');
//import chai from 'chai';
//const chai = require('chai')
const assert = require('./node_modules/chai');
//import assert from 'chai';
//import { searchAPI } from './index';
const { searchAPI } = require('./index.js');


// describe('Play function', () => {
//   it('renders a command to type a query', () => {
//     expect(books.play()).to.be.true
//   });
// });

describe('Search API function', () => {
  it('finds JSON data', () => {
    assert.isNotNull(searchAPI('writing'));
  });
});