'use strict';

module.exports = (Author) => {
  Author.validatesLengthOf('name', {
    max: 100,
    message: {max: 'Author name is too long'},
  });
  Author.validatesLengthOf('biography', {
    max: 1000,
    message: {max: 'Biography name is too long'},
  });
};
