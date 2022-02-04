{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      bookImage: '.book__image',
      filters: '.filters',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const favoriteBooks = [];
  const filteredBooks = [];

  function render() {
    for (let book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);

      book.ratingBgc = ratingBgc;

      book.ratingWidth = book.rating * 10;

      const generatedHTML = templates.bookTemplate(book);

      const elementDOM = utils.createDOMFromHTML(generatedHTML);

      const booksContainer = document.querySelector(select.containerOf.booksList);

      booksContainer.appendChild(elementDOM);
    }
  }

  function initActions() {
    const booksList = document.querySelector(select.containerOf.booksList);
    const filters = document.querySelector(select.containerOf.filters);

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

    filters.addEventListener('click', function (event) {
      const clickedFilter = event.target;
      if (clickedFilter.tagName === 'INPUT' && clickedFilter.type === 'checkbox' && clickedFilter.name === 'filter') {
        if (clickedFilter.checked) {
          filteredBooks.push(clickedFilter.value);
          console.log(filteredBooks);
        } else {
          filteredBooks.splice(filteredBooks.indexOf(clickedFilter.value), 1);
          console.log(filteredBooks);
        }
      }

      filterBooks();
    });
  }

  function filterBooks() {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filteredBooks) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      if (shouldBeHidden) {
        const bookToShow = document.querySelector('.book__image[data-id="' + book.id + '"]');
        bookToShow.classList.add('hidden');
      } else {
        const bookToShow = document.querySelector('.book__image[data-id="' + book.id + '"]');
        bookToShow.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){
    let background;

    if(rating < 6){
      background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;
  }

  render();
  initActions();
}