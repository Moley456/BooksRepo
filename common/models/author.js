'use strict';

module.exports = (Author) => {
  Author.validatesLengthOf('name', {
    max: 50,
    message: {max: 'Author name is too long'},
  });
  Author.validatesLengthOf('biography', {
    max: 1000,
    message: {max: 'Biography name is too long'},
  });

  // Disallows deletion of author if there are books that are authored by them.
  Author.observe('before delete', (ctx, next) => {
    Author.findOne({where: {name: ctx.where.name}}, (err, res) => {
      if (err) {
        return next(err);
      }

      if (res == null) {
        return next();
      }

      res.authored.count((err, res) => {
        if (err) {
          return next(err);
        }
        if (res != 0) {
          var error = {
            statusCode: 400,
            message:
              'Unable to delete author when there are books authored by them.',
          };
          return next(error);
        } else {
          return next();
        }
      });
    });
  });
};
