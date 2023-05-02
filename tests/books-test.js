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
          done();
        });
      }
    );
  });

  afterEach((done) => {
    Book.deleteAll({title: 'book1'}, () => {
      done();
    });
  });

  // clean up
  after((done) => {
    Author.deleteAll({name: 'author1'})
      .then(() => Author.deleteAll({name: 'author2'}))
      .then(() => done());
  });

  describe('GET', () => {
    it('GET all books', (done) => {
      request
        .get('/api/books')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          assert(res.body.length != 0);
          done();
        });
    });
  });

  describe('POST', () => {
    it('POST new book', (done) => {
      request
        .post('/api/books')
        .send({
          title: 'book1',
          publisher: 'publisher2',
          year: 2013,
          authorId: 'author1',
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          assert(res.body.title == 'book1');
          assert(res.body.publisher == 'publisher2');
          assert(res.body.year == 2013);
          assert(res.body.authorId == 'author1');
          done();
        });
    });

    it('fail to POST book with title more than 50 characters', (done) => {
      request
        .post('/api/books')
        .send({
          title:
            'longlonglonglonglonglonglonglonglonglonglonglonglonglonglong' +
            'longlonglonglonglonglonglonglonglonglongtitle',
          publisher: 'publisher2',
          year: 1999,
          authorId: 'author1',
        })
        .expect(422)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          assert(res.body.error.name == 'ValidationError');
          assert(res.body.error.details.codes.title[0] == 'length.max');
          done();
        });
    });

    it('fail to POST book with publisher more than 50 characters', (done) => {
      request
        .post('/api/books')
        .send({
          title: 'book1',
          publisher:
            'longlonglonglonglonglonglonglonglonglonglonglonglonglonglong' +
            'longlonglonglonglonglonglonglonglonglongpublisher',
          year: 1999,
          authorId: 'author1',
        })
        .expect(422)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          assert(res.body.error.name == 'ValidationError');
          assert(res.body.error.details.codes.publisher[0] == 'length.max');
          done();
        });
    });

    it('fail to POST book year value of more than 9999', (done) => {
      request
        .post('/api/books')
        .send({
          title: 'book1',
          publisher: 'publisher2',
          year: 19999,
          authorId: 'author1',
        })
        .expect(422)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          assert(res.body.error.name == 'ValidationError');
          assert(res.body.error.details.codes.year[0] == 'format');
          done();
        });
    });

    it('fail to POST book with publisher more than 50 characters', (done) => {
      request
        .post('/api/books')
        .send({
          title: 'book1',
          publisher: 'publisher2',
          year: 1999,
          authorId:
            'longlonglonglonglonglonglonglonglonglonglonglonglonglonglong' +
            'longlonglonglonglonglonglonglonglonglongname',
        })
        .expect(422)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          assert(res.body.error.name == 'ValidationError');
          assert(res.body.error.details.codes.authorId[0] == 'length.max');
          done();
        });
    });

    it('fail to POST existing book1', (done) => {
      request
        .post('/api/books')
        .send({
          title: 'book1',
          publisher: 'publisher1',
          year: 1999,
          authorId: 'author1',
        })
        .expect(500, done);
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
            done(err);
          }
          assert(res.body.publisher == 'publisher2');
          assert(res.body.year == 2000);
          done();
        });
    });

    it('PATCH book1 author', (done) => {
      request
        .patch(`/api/books/${bookId}`)
        .send({authorId: 'author2'})
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          assert(res.body.authorId == 'author2');
          Author.findOne({where: {name: 'author2'}}, (err, res) => {
            assert(res != null);
            done();
          });
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

  describe('DELETE', () => {
    it('DELETE non-existant book', (done) => {
      request
        .delete('/api/books/non-exist')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          assert(res.body.count == 0);
          done();
        });
    });

    it('DELETE book1', (done) => {
      request.delete(`/api/authors/${bookId}`).expect(200, done);
    });
  });
});
