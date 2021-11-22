window.addEventListener('load', () => {
  const container = document.querySelector('.container');
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  const submit = document.querySelector('.submit');
  submit.addEventListener('click', () => {
    const titleInp = title.value;
    const authorInp = author.value;
    localStorage.setItem(titleInp, authorInp);
  });

  for (let i = 0; i <= localStorage.length; i++) {
    const bookTitle = localStorage.key(i);
    const author = localStorage.getItem(bookTitle);

    const book = {
      id: i,
      title: bookTitle,
      author: author
    }

    if (bookTitle != null && author != null ){
      container.innerHTML += `<ul>
          <li>${book.title}</li>
          <li>by</li>
          <li>${book.author}</li>
        </ul>`;
    }
  }
});