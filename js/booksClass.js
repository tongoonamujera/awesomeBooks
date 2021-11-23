/* eslint max-classes-per-file: ["error", 3] */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

export class Html {
  // Append new book item to list
  static createBookItem(book, index) {
    const booksList = document.querySelector('.booksList');
    const newBook = document.createElement('div');
    newBook.innerHTML += `
    <p><strong>${book.title}</strong></p>
    <p><strong>${book.author}</strong></p>
    <button class="deleteBook" type="button" data-id=${index} data-title=${book.title} data-author=${book.author}> Remove </button>
    <hr>
    `;
    newBook.querySelector('button').addEventListener('click', (e) => LocalStorage.deleteBook(e));
    booksList.appendChild(newBook);
  }

  static displayBooks() {
    const books = LocalStorage.getBooks();
    if (books) {
      books.forEach((book, index) => {
        Html.createBookItem(book, index);
      });
    }
  }

  // Remove book item from list
  static removeBookItem(e) {
    const parent = e.target.parentElement;
    parent.remove();
  }

  // Clear inputs
  static clearInputs() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });
  }

  // Shift button id by -1
  static alignButtons(index) {
    document.querySelectorAll('.deleteBook').forEach((button) => {
      if (button.dataset.id > index) {
        button.dataset.id -= 1;
      }
    });
  }
}

export class LocalStorage {
  // Get books from storage
  static getBooks() {
    let books = JSON.parse(localStorage.getItem('books'));
    if (!books) {
      books = [];
    }
    return books;
  }

  // Add new book
  static addBook(title, author) {
    const books = LocalStorage.getBooks();
    if (title && author) {
      const book = new Book(title, author);
      books.push(book);
      const data = JSON.stringify(books);
      localStorage.setItem('books', data);

      // createBookItem
      Html.createBookItem(book, books.length - 1);
      Html.clearInputs();
    }
  }

  // Delete book
  static deleteBook(e) {
    const books = LocalStorage.getBooks();
    const index = e.target.dataset.id;
    books.splice(index, 1);
    Html.alignButtons(index);
    const data = JSON.stringify(books);
    localStorage.setItem('books', data);
    Html.removeBookItem(e);
    Html.alignButtons(index);
  }
}
