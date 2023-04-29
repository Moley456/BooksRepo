'use strict';

describe('/books', () => {
  var server = require('../server/server');
  var request = require('supertest')(server);
  var expect = require('expect.js');
  const assert = require('assert');

  var Author, Book, bookId;

  before(() => {
    Book = server.models.Book;
    Author = server.models.Author;
  });

  beforeEach((done) => {
    Book.upsert(
      {
        title: 'book1',
        publisher: 'publisher1',
        year: 1999,
        authorId: 'author1',
      },
      () => {
        Book.findOne({where: {title: 'book1'}}, (err, res) => {
          bookId = res.id;
        });
        done();
      }
    );
  });

  after(() => {
    Book.deleteAll({where: {title: 'book1'}});
  });

  describe('GET', () => {
    it('GET all books', (done) => {
      request
        .get('/api/books')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert(res.body.length != 0);
          return done();
        });
    });
  });

  describe('PATCH', () => {
    it('PATCH book1 publisher and year', (done) => {
      request
        .patch(`/api/books/${bookId}`)
        .send({publisher: 'publisher2', year: 2000})
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert(res.body.publisher == 'publisher2');
          assert(res.body.year == 2000);
          return done();
        });
    });

    it('fail to PATCH non-existing book', (done) => {
      request
        .patch('/api/books/non-exist')
        .send({publisher: 'publisher2'})
        .expect(404, done);
    });

    it('fail to PATCH non-existing property of book1', (done) => {
      request
        .patch(`/api/books/${bookId}`)
        .send({nonExist: 'non-exist'})
        .expect(422, done);
    });
  });

  //   describe('POST', () => {
  //     it('POST author2', (done) => {
  //       request
  //         .post('/api/authors')
  //         .send({name: 'author2', biography: 'I write books'})
  //         .expect(200)
  //         .end((err, res) => {
  //           if (err) {
  //             return done(err);
  //           }
  //           assert(res.body.name == 'author2');
  //           assert(res.body.biography == 'I write books');
  //           return done();
  //         });
  //     });

  //     it('fail to POST author with name more than 100 characters', (done) => {
  //       request
  //         .post('/api/authors')
  //         .send({
  //           name:
  //             'longlonglonglonglonglonglonglonglonglonglonglonglonglonglong' +
  //             'longlonglonglonglonglonglonglonglonglonglonglonglonglonglong' +
  //             'longlonglonglonglonglonglonglonglonglongname',
  //           biography: 'I write books',
  //         })
  //         .expect(422)
  //         .end((err, res) => {
  //           if (err) {
  //             return done(err);
  //           }
  //           assert(res.body.error.name == 'ValidationError');
  //           assert(res.body.error.details.codes.name[0] == 'length.max');
  //           return done();
  //         });
  //     });

  //     it('fail to POST existing author1', (done) => {
  //       request
  //         .post('/api/authors')
  //         .send({name: 'author1', biography: 'This is my biography'})
  //         .expect(500, done);
  //     });
  //   });

  describe('DELETE', () => {
    it('DELETE non-existant book', (done) => {
      request
        .delete('/api/books/non-exist')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert(res.body.count == 0);
          return done();
        });
    });

    it('DELETE book1', (done) => {
      request.delete(`/api/authors/${bookId}`).expect(200, done);
    });
  });
});
