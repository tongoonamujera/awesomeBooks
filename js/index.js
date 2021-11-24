import { Html, LocalStorage } from './booksClass.js';

const newBookForm = document.querySelector('#newBookForm');
newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  LocalStorage.addBook(e.target.title.value, e.target.author.value);
});

Html.displayBooks();

// Display luxon date
const currentDateElement = document.querySelector(".current-date"); 
var date = luxon.DateTime.now().toFormat('LLL dd yyyy, t')
console.log(date)
currentDateElement.innerHTML += `<p> ${date} </p>`