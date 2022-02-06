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

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filteredBooks = [];
      thisBooksList.bookList = document.querySelector(select.containerOf.booksList);
      thisBooksList.filters = document.querySelector(select.containerOf.filters);
    }

    render() {
      const thisBooksList = this;
      for (let book of dataSource.books) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);

        book.ratingBgc = ratingBgc;

        book.ratingWidth = book.rating * 10;

        const generatedHTML = templates.bookTemplate(book);

        const elementDOM = utils.createDOMFromHTML(generatedHTML);

        const booksContainer = document.querySelector(select.containerOf.booksList);

        booksContainer.appendChild(elementDOM);
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.bookList.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const image = event.target.offsetParent;

        if (image.classList.contains('book__image')) {
          const bookId = image.getAttribute('data-id');
          if (thisBooksList.favoriteBooks.includes(bookId)) {
            image.classList.remove('favorite');
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(bookId), 1);
            console.log(thisBooksList.favoriteBooks);
          } else {
            image.classList.add('favorite');
            thisBooksList.favoriteBooks.push(bookId);
            console.log(thisBooksList.favoriteBooks);
          }
        }
      });

      thisBooksList.filters.addEventListener('click', function (event) {
        event.preventDefault();
        const clickedFilter = event.target;
        if (clickedFilter.tagName === 'INPUT' && clickedFilter.type === 'checkbox' && clickedFilter.name === 'filter') {
          if (clickedFilter.checked) {
            thisBooksList.filteredBooks.push(clickedFilter.value);
            console.log(thisBooksList.filteredBooks);
          } else {
            thisBooksList.filteredBooks.splice(thisBooksList.filteredBooks.indexOf(clickedFilter.value), 1);
            console.log(thisBooksList.filteredBooks);
          }
        }

        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for (let book of dataSource.books) {
        let shouldBeHidden = false;
        for (const filter of thisBooksList.filteredBooks) {
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

    determineRatingBgc(rating) {
      let background;

      if (rating < 6) {
        background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }

      return background;
    }
  }

  new BooksList();
}