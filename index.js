/* eslint-disable no-console */
import config from './config.js';
import fetch from 'node-fetch';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//The bookList array will hold the first 5 book results from the user's given search. This will reset for each new search.
let bookList = [];
//The readingList array hold all of the books that have been selected by the user that they want to read.
let readingList = [];

//This line is changed from my last version to use readline instead of process.stdin so as to use async/await instead of the callbacks necessary from process.stdin.
const play = async () => {
  console.log('Type a query to search');
  for await (const line of rl) {
    if (/^\d{1}$/.test(line) === false && /\p{Extended_Pictographic}/u.test(line) === false) {
      fetch(`${config.API_ENDPOINT}?q=${line}`)
        .then(response => response.json())
        .then(data => determineBookResults(data))
        .catch(err => {
          console.error(err);
        });
        searchResult(line);
        bookList = [];
    } else if ( /\p{Extended_Pictographic}/u.test(line) === true) {
      console.log('Please use only letters and numbers in your search. Try another query.')
    } else if (/^\d{1}$/.test(line) === true) {
      if (line >= 6 || line <= 0) {
        console.log('Enter a number between 1-5.')
      } else {
        displayReadingList(line)
      }
    }
  }
}

const returnFiveResults = function(par) {
  if (par.totalItems >= 1) {
    addReadingList();
    par.items.slice(0, 5).forEach((books, i) => {
      console.log(`${i + 1}` + '. ' + books['volumeInfo']['title'] + ' by ' + books['volumeInfo']['authors'] + ', published by ' + books['volumeInfo']['publisher']);  
    });
  }
};

const determineBookResults = function(par) {
  if (par.totalItems === 0) {
    console.log('No books found.');
    tryAgain();
  } else {
    bookList.push(par.items.slice(0, 5));
  }
};

const tryAgain = function() {
  console.log('Try entering a different query.');
};

const searchAPI = function(line) {
  fetch(`${config.API_ENDPOINT}?q=${line}`)
    .then(response => response.json())
    .then(data => returnFiveResults(data))
    .catch(err => {
      console.error(err);
    });
};

const searchResult = function(line) {
  searchAPI(line);
};

const addReadingList = function() {
  //Displays options for user to show there are two paths: no books interest the user, or one of the books interests the user.
  console.log('If you would like to add any of these books to your reading list, enter its corresponding number below. If not, you can enter another search term to see other books displayed.');
};

const displayReadingList = function(line) {
  console.log('Good choice! You chose to add book number ' + line + 'Your reading list so far:');
  let bookIndex = line - 1;
  let books = bookList[0];
  //Formats reading list books to show identical to how they were displayed from the fetch statement at line 44 and collects them in readingList array.
  readingList.push(books[bookIndex]['volumeInfo']['title'] + ' by ' + books[bookIndex]['volumeInfo']['authors'] + ', published by ' + books[bookIndex]['volumeInfo']['publisher']);
  console.log(readingList);
  //Resets bookList array to empty for a new search to be handled.
  bookList = [];
  console.log('Type another query to search from Google books.');
};

play();

module.exports = { play, displayReadingList }