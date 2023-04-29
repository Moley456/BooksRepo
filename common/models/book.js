'use strict';

module.exports = (Book) => {
  Book.validatesLengthOf('title', {
    max: 100,
    message: {max: 'Book title is too long'},
  });
  Book.validatesLengthOf('publisher', {
    max: 100,
    message: {max: 'Publisher name is too long'},
  });
  Book.validatesFormatOf('year', {
    with: /^\d{1,4}$/,
    message: 'Year is not in correct format',
  });
  Book.validatesLengthOf('authorId', {
    max: 100,
    message: {max: 'Author name is too long'},
  });

  // For a new Book instance, creates and saves a new Author instance with
  // the same author name if it did not exist.
  Book.observe('after save', (ctx, next) => {
    const Author = Book.app.models.Author;

    if (ctx.instance && ctx.instance.authorId) {
      const authorName = ctx.instance.authorId;
      Author.findOrCreate({where: {name: authorName}}, {name: authorName});
    }

    next();
  });
};
