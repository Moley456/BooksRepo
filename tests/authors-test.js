'use strict';

describe('/authors', () => {
  var server = require('../server/server');
  var request = require('supertest')(server);
  var expect = require('expect.js');
  const assert = require('assert');

  var Author, Book;

  before(() => {
    Author = server.models.Author;
  });

  beforeEach((done) => {
    Author.upsert({name: 'author1', biography: 'This is my biography'}, () => {
      done();
    });
  });

  describe('GET', () => {
    it('GET all authors', (done) => {
      request
        .get('/api/authors/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert(res.body.length != 0);
          return done();
        });
    });

    it('GET author1', (done) => {
      request
        .get('/api/authors/author1')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert(res.body.name == 'author1');
          assert(res.body.biography == 'This is my biography');
          return done();
        });
    });

    it('GET non-existant author', (done) => {
      request.get('/api/authors/non-exist').expect(404, done);
    });
  });

  describe('PATCH', () => {
    it('PATCH author1', (done) => {
      request
        .patch('/api/authors/author1')
        .send({biography: 'My updated biography'})
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert(res.body.biography == 'My updated biography');
          return done();
        });
    });

    it('fail to PATCH non-existing author', (done) => {
      request
        .patch('/api/authors/non-exist')
        .send({biography: 'My updated biography'})
        .expect(404, done);
    });

    it('fail to PATCH non-existing property of author1', (done) => {
      request
        .patch('/api/authors/author1')
        .send({nonExist: 'non-exist'})
        .expect(422, done);
    });
  });

  describe('POST', () => {
    it('POST author2', (done) => {
      request
        .post('/api/authors')
        .send({name: 'author2', biography: 'I write books'})
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert(res.body.name == 'author2');
          assert(res.body.biography == 'I write books');
          return done();
        });
    });

    it('fail to POST author with name more than 100 characters', (done) => {
      request
        .post('/api/authors')
        .send({
          name:
            'longlonglonglonglonglonglonglonglonglonglonglonglonglonglong' +
            'longlonglonglonglonglonglonglonglonglonglonglonglonglonglong' +
            'longlonglonglonglonglonglonglonglonglongname',
          biography: 'I write books',
        })
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert(res.body.error.name == 'ValidationError');
          assert(res.body.error.details.codes.name[0] == 'length.max');
          return done();
        });
    });

    it('fail to POST existing author1', (done) => {
      request
        .post('/api/authors')
        .send({name: 'author1', biography: 'This is my biography'})
        .expect(500, done);
    });
  });

  describe('DELETE', () => {
    it('DELETE non-existant author', (done) => {
      request
        .delete('/api/authors/non-exist')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert(res.body.count == 0);
          return done();
        });
    });

    it('fail to DELETE author1 with existing authored books', (done) => {
      Book = server.models.Book;
      Book.create({
        title: 'book1',
        publisher: 'publisher1',
        year: 2019,
        authorId: 'author1',
      });
      request.delete('/api/authors/author1').expect(400, () => {
        Book.findOne({where: {authorId: 'author1'}}, (err, book) => {
          book.delete();
        });
        done();
      });
    });

    it('DELETE author2', (done) => {
      request.delete('/api/authors/author2').expect(200, done);
    });

    it('DELETE author1', (done) => {
      request.delete('/api/authors/author1').expect(200, done);
    });
  });
});
