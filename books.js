/* eslint-disable no-console */
import config from './config.js';
import fetch from 'node-fetch';

//The bookList array will hold the first 5 book results from the user's given search. This will reset for each new search.
let bookList = [];
//The readingList array hold all of the books that have been selected by the user that they want to read.
let readingList = [];

const play = function() {
  console.log('Type a query to search from Google books.');
  //This line allows user to enter their search term, and also sets the stage for when input will later be used to select a book. Data will be parsed based on length to determine which feature is being used.
  process.openStdin().on('data', function(chunk) {
    //Buffered chunks of one character (1, 2, 3, 4, or 5) show a length of 3. Buffered chunks of two or more characters denote a search term and technically show a length of 4.
    if (chunk.toString('utf8').length >= 4) {
      fetch(`${config.API_ENDPOINT}?q=${chunk}`)
        .then(response => response.json())
        //This line pushes the first five results into the bookList array and later allows user to select from them.
        .then(data => bookList.push(data.items.slice(0, 5)))
        .catch(err => {
          console.error(err);
        });
      searchResult(chunk);
      //Resets bookList to empty if a new search is requested.
      bookList = [];
    } else {
      //Handles error of any number outlying the indiciated book results.
      if (chunk.toString('utf8') >= 6 || chunk.toString('utf8') <= 0) {
        console.log('Enter a number between 1-5.');
      } else {
        displayReadingList(chunk);
      }
    }
  });
};

const searchAPI = function(chunk) {
  fetch(`${config.API_ENDPOINT}?q=${chunk}`)
    .then(response => response.json())
    //Loops through all five book result objects and displays them with a corresponding number in list form for user.
    .then(data => (data.items).slice(0, 5).forEach((books, i) => {
      console.log(`${i + 1}` + '. ' + books['volumeInfo']['title'] + ' by ' + books['volumeInfo']['authors'] + ', published by ' + books['volumeInfo']['publisher']);
    }))
    .catch(err => {
      console.error(err);
    });
};

const searchResult = function(chunk) {
  console.log('Nice! Here are some books about ' + chunk);
  searchAPI(chunk);
  addReadingList();
};

const addReadingList = function() {
  //Displays options for user to show there are two paths: no books interest the user, or one of the books interests the user.
  console.log('If you would like to add any of these books to your reading list, enter its corresponding number below. If not, you can enter another search term to see other books displayed.');
};

const displayReadingList = function(chunk) {
  console.log('Good choice! You chose to add book number ' + chunk + 'Your reading list so far:');
  let bookIndex = chunk - 1;
  let books = bookList[0];
  //Formats reading list books to show identical to how they were displayed from the fetch statement at line 38 and collects them in readingList array.
  readingList.push(books[bookIndex]['volumeInfo']['title'] + ' by ' + books[bookIndex]['volumeInfo']['authors'] + ', published by ' + books[bookIndex]['volumeInfo']['publisher']);
  console.log(readingList);
  //Resets bookList array to empty for a new search to be handled.
  bookList = [];
  console.log('Type another query to search from Google books.');
};

play();