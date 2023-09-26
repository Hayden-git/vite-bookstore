# Bookstore App Refactored with Vite

### Overview
This was one of my very first projects - it was originally built with vanilla javascript, but I am in the process of starting to refactor the code to become more responsive/eventually to become refactored into a React application. The app allows users to search for books by author, title, or ISBN number, fetching results from the Google Books API. Users can navigate through pages of search results using pagination. Additionally, users have the capability to save books into local storage under "My Library." This project serves as a demonstration of the developer's knowledge of API integration, fundamental JavaScript concepts, and web design with CSS. 

<img width="960" alt="image" src="https://github.com/Hayden-git/vite-bookstore/assets/105612431/1fdfdac8-e0ea-4be2-97e9-b191acb65c3e">

### Features
* Search for books by author, title, or ISBN number.
* Display search results from the Google Books API.
* Pagination for browsing multiple pages of search results.
* Option to save books into local storage under "My Library."
* A clean and responsive user interface built with CSS.

### Getting Started
To run this project locally, follow these steps:

1. Clone this repository to your local machine:
```shell
git clone https://github.com/your-username/bookstore-app.git
```
2. Go to the project directory:
```shell
cd bookstore-app
```
3. Install project dependencies using npm
```shell
npm install
```
4. Sign up for a free API key for the Google Books API here: https://developers.google.com/books

5. Start the development server
```shell
npm run dev
```
5. Open your web browser and visit http://localhost:3000 to view the app.

## Saving Books to "My Library"
To save a book to your local storage "My Library," follow these steps:

1. Perform a book search using the search bar.
2. In the search results, locate the book you want to save.
3. Click on the "Save to My Library" button associated with the book.
4. The book will be added to your "My Library."

## Project Structure 
<img width="118" alt="image" src="https://github.com/Hayden-git/vite-bookstore/assets/105612431/228f8243-4bf5-4fe0-ad3b-ce9d8bf8e981">

## Dependencies
This project relies on the following:
* Vite - The build tool used to begin refactoring this project.
* Vue.js - A JavaScript framework used for building user interfaces.
* Google Books API - Used to fetch search results based on user queries.

  
  
