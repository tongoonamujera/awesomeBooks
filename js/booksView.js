var books = JSON.parse(localStorage.getItem('books'));
const booksList = document.querySelector(".booksList");


export function displayBooks() {
  if(books) {
    books.forEach((book,index) => {
      let newBook = document.createElement('div')
      newBook.innerHTML += `
      <h3>${book.title}</h3>
      <h3>${book.author}</h3>
      <button class="deleteBook" type="button" data-id=${index} data-title=${book.title} data-author=${book.author}> Remove </button>
      <hr>
      `
      booksList.appendChild(newBook);
    });
    document.querySelectorAll(".deleteBook").forEach((button) => {
      button.addEventListener('click',deleteBook);
    });
  }
}

function reloadBooks() {
  booksList.innerHTML = "";
  displayBooks();
}

export const addBook = (e) => {
  e.preventDefault();
  if(!books) {
    books = [];
  }
  let title = e.target.title.value;
  let author = e.target.author.value;
  if(!title || !author){
    alert("Please provide a valid title and author name");
  }
  else{
    books.push({title:`${title}`,author:`${author}`});
    let data = JSON.stringify(books);
    localStorage.setItem('books',data);
    reloadBooks();
  }
}

const deleteBook = (e) => {
  let index = e.target.dataset.id
  console.log(index)
  delete books[index]
  books.splice(index,1)

  document.querySelectorAll(".deleteBook").forEach((button) => {
    if(button.dataset.id > index) {
      button.dataset.id -- 
    }
  });
  let data = JSON.stringify(books);
  localStorage.setItem('books',data);
  reloadBooks()
}

