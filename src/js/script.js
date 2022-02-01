{
    'use strict';

    const select = {
        templateOf: {
            book: '#template-book',
        },
        listOf: {
            booksList: '.books-list',
        }
    };

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };

    const render = function () {
        for (let book of dataSource.books) {
            const generatedHTML = templates.bookTemplate(book);
            const elementDOM = utils.createDOMFromHTML(generatedHTML);
            const booksContainer = document.querySelector(select.listOf.booksList);
            booksContainer.appendChild(elementDOM);
        }
    };

    render();
}