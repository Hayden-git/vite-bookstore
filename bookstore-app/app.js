
require('dotenv').config();

// Set API key and URL for Google Books API
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY; // issue with .env file to fix 
const API_URL = 'https://www.googleapis.com/books/v1/volumes?&q=';

// globally defined to call inside functions
let currentPage = 0; // to keep track of current page of pagination (take the current page and multiply it by the take to determine offset/skip amount, then add 12 (take) to that)
let take = 12; // The amount of results to pull per page - 12 books per page


function changePage(direction /* page up or page down */)
{
  console.log("Changing page: " + direction)

  // If direction is "up", increment currentPage variable by 1
  if(direction == "up") 
  {
    currentPage++;
  };

  // If direction is "down", decrement currentPage variable by 1
  if(direction == "down")
  {
    currentPage--;
  };

  // Call the searchBooks function to get the new results based on the updated currentPage and search query
  searchBooks(getQueryValue());
};

// Gets the value of the search query input field
function getQueryValue()
{
  let query = document.getElementById('query').value;

  console.log(query)

  return query;
};


////////////////////////

function searchBooks(query) 
{
  // Index refers to the page, the array of books contains 12 results per page/index value
  let startIndexValue = 0;

  startIndexValue = currentPage * take;

  let startIndex = `&startIndex=${startIndexValue}`;
  let maxResults = `&maxResults=12`;


  // Fetch to make a GET request to the Google Books API based on user search input
  fetch(`${API_URL}${query}${startIndex}${maxResults}&key=${API_KEY}`)

    // When the response comes back, parse it as JSON
    .then(response => response.json())

    .then(data => {
      console.log(data);
      
      // Create a container for the book results inside of a <div> with class "book-container"
      const booksContainer = document.createElement('div');
      booksContainer.classList.add('books-container');
      

      // Loop through each book in the parsed JSON response and create HTML elements
      data.items.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `

          <div class="results">
          <img class="result-image" src="${book.volumeInfo.imageLinks?.thumbnail}">
          <h3 class="result-title">${book.volumeInfo?.title}</h3>
          <p class="result-author">By ${book.volumeInfo.authors?.join(', ')}</p>
          <p class="result-publishing">Published in ${book.volumeInfo?.publishedDate}</p>
          <p class="result-blurb">${book.searchInfo?.textSnippet}</p>
          <button class="add-to-library-btn">Add to my library!</button>
          </div>
        `;

        // Event listener for "Add to Library" button
        const addToLibraryBtn = bookElement.querySelector('.add-to-library-btn');
        addToLibraryBtn.addEventListener('click', () => {

          // Add the selected book to the savedBooks array
          savedBooks.push(book);

          // Keep the updated saved books array in local storage
          localStorage.setItem('savedBooks', JSON.stringify(savedBooks));

          // Log the saved book to the console
          console.log(`Book with title "${book.volumeInfo?.title}" saved to library!`);
          console.log(savedBooks);
        });

        // Add the book element to the books container
        booksContainer.appendChild(bookElement);
      });

      // Add the books container to the page - the results displayed on DOM
      const container = document.querySelector('.container');

      // When the user searches a new title, refresh the results
      const previousSearchResults = document.querySelectorAll('.books-container');
      previousSearchResults.forEach(result => result.remove());

      container.appendChild(booksContainer);
    })
    .catch(error => {
      console.error(error);
  });
};

//////////////

// Retrives savedBooks, parsed into JSON and checks if the "library" storage is empty or not...
let savedBooks = JSON.parse(localStorage.getItem('savedBooks'));
// if savedBooks is falsey, assign it to an empty array [] to store books in local storage... 
if (!savedBooks) 
{
  savedBooks = [];
}

const savedBooksContainer = document.querySelector('.saved-books-container');

if (savedBooks && savedBooks.length > 0) 
{
  // Loop through each saved book and create an element to display it
  savedBooks.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('saved-book');
    bookElement.innerHTML = `

      <div class="results">
        <img class="result-image" src="${book.volumeInfo.imageLinks?.thumbnail}">
        <h3 class="result-title">${book.volumeInfo?.title}</h3>
        <p class="result-author">By ${book.volumeInfo.authors?.join(', ')}</p>
        <p class="result-ratings">Average rating: ${book.volumeInfo?.averageRating} out of 5 stars</p>
        <p class="result-publishing">Published in ${book.volumeInfo?.publishedDate}</p>
        <p class="result-blurb">${book.searchInfo?.textSnippet}</p>
        <button class="result-link"><a href="${book.volumeInfo?.previewLink}" target="_blank">Click here to purchase!</a></button>
        <button class="remove-from-library-btn">Remove from library</button>
      </div>
    `;

    // Event listener for the "Remove From my Library" button
    const removeFromLibraryBtn = bookElement.querySelector('.remove-from-library-btn')
    removeFromLibraryBtn.addEventListener('click', () => {

      // Removes a book item from savedBooks if it has a matching id property to the book item that triggered the event listener...
      savedBooks = savedBooks.filter(savedBook => savedBook.id !== book.id)

      // Store the updated saved books array in local storage
      localStorage.setItem('savedBooks', JSON.stringify(savedBooks));

      // Remove the book element from the DOM
      try {
      savedBooksContainer.removeChild(bookElement);
      } catch (error) {
        // console.log(error)
      }
    });
    console.log(bookElement);

    try {
      // Add the book element to the saved books container
    savedBooksContainer.appendChild(bookElement);
    } catch (error) {
      // console.log(error)
     };
  });
};

