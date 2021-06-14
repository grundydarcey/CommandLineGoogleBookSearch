/* eslint-disable no-console */
import config from './config.js';
import fetch from 'node-fetch';

let bookList = [];
let readingList = [];

const play = function() {
  console.log('Type a query to search from Google books.');
  process.openStdin().on('data', function(chunk) {
    if (chunk.toString('utf8').length >= 4) {
      fetch(`${config.API_ENDPOINT}?q=${chunk}`)
        .then(response => response.json())
        .then(data => bookList.push(data.items.slice(0, 5)));
      searchResult(chunk);
    } else {
      if (chunk.toString('utf8') >= 6 || chunk.toString('utf8') <= 0) {
        console.log('Enter a number between 1-5.');
      } else {
        displayReadingList(chunk);
      }
    }
  });
};

const searchResult = function(chunk) {
  console.log('Nice! Here are some books about ' + chunk);
  fetch(`${config.API_ENDPOINT}?q=${chunk}`)
    .then(response => response.json())
    .then(data => (data.items).slice(0, 5).forEach((books, i) => {
      console.log(`${i + 1}` + '. ' + books['volumeInfo']['title'] + ' by ' + books['volumeInfo']['authors'] + ', published by ' + books['volumeInfo']['publisher']);
    }))
    .catch(err => {
      console.error(err);
    });
  addReadingList();
};

const addReadingList = function() {
  console.log('If you would like to add any of these books to your reading list, enter its corresponding number below.');
};

const displayReadingList = function(chunk) {
  console.log('Good choice! You chose to add book number ' + chunk + 'Your reading list so far:');
  let bookIndex = chunk - 1;
  let books = bookList[0];
  readingList.push(books[bookIndex]['volumeInfo']['title'] + ' by ' + books[bookIndex]['volumeInfo']['authors'] + ', published by ' + books[bookIndex]['volumeInfo']['publisher']);
  console.log(readingList);
  bookList = [];
  console.log('Type another query to search from Google books.');
};

play();