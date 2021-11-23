let books = JSON.parse(localStorage.getItem('books'));
const booksList = document.querySelector('.booksList');

class Book {
  constructor(){};
  deleteBook = (e) => {
    const index = e.target.dataset.id;
    const parent = e.target.parentElement;
    books.splice(index, 1);
    document.querySelectorAll('.deleteBook').forEach((button) => {
      if (button.dataset.id > index) {
        button.dataset.id -= 1;
      }
    });
    const data = JSON.stringify(books);
    localStorage.setItem('books', data);
    parent.remove();
  };

  createBookItem(book, index) {
    const newBook = document.createElement('div');
    newBook.innerHTML += `
    <p><strong>${book.title}</strong></p>
    <p><strong>${book.author}</strong></p>
    <button class="deleteBook" type="button" data-id=${index} data-title=${book.title} data-author=${book.author}> Remove </button>
    <hr>
    `;
    newBook.querySelector('button').addEventListener('click', this.deleteBook);
    booksList.appendChild(newBook);
  }

  displayBooks() {
    if (books) {
      books.forEach((book, index) => {
        this.createBookItem(book, index);
      });
    }
  }

  addBook = (e) => {
    e.preventDefault();
    if (!books) {
      books = [];
    }
    const title = e.target.title.value;
    const author = e.target.author.value;
    if (title && author) {
      const book = { title: `${title}`, author: `${author}` };
      books.push(book);
      const data = JSON.stringify(books);
      localStorage.setItem('books', data);
      this.createBookItem(book, books.length - 1);
    }
  }
}

const allBooks = new Book();

const newBookForm = document.querySelector('#newBookForm');
newBookForm.addEventListener('submit', allBooks.addBook);
allBooks.displayBooks();