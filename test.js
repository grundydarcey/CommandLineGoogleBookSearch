const play = require('./index');
const chai = require('chai');
const expect = chai.expect;

describe('Play function', () => {
  it('should be able to tell when an emoji is entered', () => {
    const line = 👍;
    const expectedOutput = 'Please use only letters and numbers in your search. Try another query.';
    const actualOutput = play(line);
    expect(actualOutput).to.equal(expectedOutput);
  })
})