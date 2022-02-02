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

  render();

  const favoriteBooks = [];

  function initActions(){
    const images = document.querySelectorAll(select.containerOf.bookImage);

    for(let image of images){
      image.addEventListener('dbclick', function(event){
        event.preventDefault();
        image.classList.add('favorite');
        let bookId = image.getAttribute('data-id');
        favoriteBooks.push(bookId);
        console.log('favoriteBooks:', favoriteBooks);
      });
    }
  }

  initActions();
}