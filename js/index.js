import {addBook , displayBooks} from './booksView.js'

const newBookForm = document.querySelector('#newBookForm');
newBookForm.addEventListener('submit',addBook);
displayBooks();