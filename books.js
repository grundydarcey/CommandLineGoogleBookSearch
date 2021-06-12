/* eslint-disable no-console */
import config from './config.js';
import fetch from 'node-fetch';

const play = function() {
  console.log('Type a query to search from some Google books.');
  process.openStdin().on('data', function(chunk) {
    searchResult(chunk.toString('utf8'));
  });
};

const searchResult = function(chunk) {
  console.log('Nice! Here are some books about ' + chunk);
  fetch(`${config.API_ENDPOINT}?q=${chunk}`)
    .then(response => response.json())
    .then(data => (data.items).slice(0, 5).forEach((books, i) => {
      console.log(`${i + 1}` + '. ' + books['volumeInfo']['title'] + ' by ' + books['volumeInfo']['authors'] + ', published by ' + books['volumeInfo']['publisher']);
    }));
  addReadingList();
};

const addReadingList = function() {
  console.log('If you would like to add any of these books to your reading list, enter its corresponding number below.');
  process.openStdin().on('data', function(chunk) {
    displayReadingList(chunk.toString('utf8'));
  });
};

const displayReadingList = function(chunk) {
  console.log('You chose book number ' + chunk);
};

play();