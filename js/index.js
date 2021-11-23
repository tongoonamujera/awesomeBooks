import { Html, LocalStorage } from './booksClass.js';

const newBookForm = document.querySelector('#newBookForm');
newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  LocalStorage.addBook(e.target.title.value, e.target.author.value);
});

Html.displayBooks();