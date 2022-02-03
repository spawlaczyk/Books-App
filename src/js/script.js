{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      bookImage: '.book__image',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  function render() {
    for (let book of dataSource.books) {
      const generatedHTML = templates.bookTemplate(book);

      const elementDOM = utils.createDOMFromHTML(generatedHTML);

      const booksContainer = document.querySelector(select.containerOf.booksList);

      booksContainer.appendChild(elementDOM);
    }
  }

  const favoriteBooks = [];

  function initActions() {
    const booksList = document.querySelector(select.containerOf.booksList);

    booksList.addEventListener('click', function (event) {
      event.preventDefault();
      const image = event.target.offsetParent;

      if (image.classList.contains('book__image')) {
        const bookId = image.getAttribute('data-id');
        if (favoriteBooks.includes(bookId)) {
          image.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
          console.log(favoriteBooks);
        } else {
          image.classList.add('favorite');
          favoriteBooks.push(bookId);
          console.log(favoriteBooks);
        }
      }
    });
  }

  render();

  initActions();
}