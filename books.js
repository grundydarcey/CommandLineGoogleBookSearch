/* eslint-disable no-console */
import config from './config.js';
import fetch from 'node-fetch';

let bookList = [];

const play = function() {
  console.log('Type a query to search from some Google books.');
  process.openStdin().on('data', function(chunk) {
    // fetch(`${config.API_ENDPOINT}?q=${chunk}`)
    //   .then(response => response.json())
    //   .then(data => bookList.push(data.items.slice(0, 5)));
    if (chunk.toString('utf8').length >= 4) {
      searchResult(chunk);
    } else {
      displayReadingList(chunk);
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
    .then(items => console.log(items.slice(0, 5)[0]));
  //.then(data => bookList.push(data.items.slice(0, 5)));
  console.log(bookList);
  //   console.log(bookList)
  addReadingList();
};

const addReadingList = function() {
  console.log('If you would like to add any of these books to your reading list, enter its corresponding number below.');
};

const displayReadingList = function(chunk) {
  console.log('Good choice! You chose to add book number ' + chunk);
  let bookIndex = chunk - 1;
  let books = bookList[0];
  let readingList = [];
  readingList.push(books[bookIndex]['volumeInfo']['title'] + ' by ' + books[bookIndex]['volumeInfo']['authors'] + ', published by ' + books[bookIndex]['volumeInfo']['publisher']);
  console.log(readingList);
  bookList = [];
};

play();