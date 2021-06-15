##Google Book Search Command Line Application

#Start Up
To start this command line application, clone it to your machine and cd into its directory. Run 'npm install' and 'node index.js' to launch the search. 

#Requirements
-This app has the ability to search through the Google books API and returns the first 5 results for any search term
-The book title, author and publisher are all available details for each book
-Given the results, the user can either add one of the books or continue to keep searching
-If a book is added to the local reading list, it will show the new addition as well as any others on their reading list

#Process
The only library I found necessary was the fetch API to return the books JSON. I kept the play function as the heavy lifter in this application by handling input and determining what type it was. I took some hints from the structure of the JavaScript tic tac toe game provided. I originally tried to use two different instances of process.openStdin but I ran into issues of each entry being used incorrectly so I instead kept the one and put a condition on the input to determine what needed to happen when. Stringifying this input also helped instead of just receiving buffered chunks. I found the variables for bookList and readingList helped a lot for tracking current searches and the permanent yet local reading list of chosen books. I made sure that bookList could be reset in case a user made a search and didn't find any books that interested them enough to add it to the reading list.