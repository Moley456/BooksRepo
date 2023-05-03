import { module, test } from 'qunit';
import { visit, fillIn, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'client/tests/helpers';

module('Acceptance | books repo', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('BooksRepo');
    assert.dom('h2').hasText('Welcome to BooksRepo!');
  });

  test('adding a new book', async function (assert) {
    await visit('/');

    assert.dom('form').exists();
    assert.dom('label').exists({ count: 4 });
    assert.dom('input').exists({ count: 4 });

    await fillIn('input.title', 'Book title 1');
    await fillIn('input.publisher', 'Publisher 1');
    await fillIn('input.year', '2023');
    await fillIn('input.author', 'test Author 1');
    await click('button.add');

    assert.dom('h3').hasText('Book title 1');
    assert.dom('text').hasText('Publisher: Publisher 1');
  });

  test('editing a book', async function (assert) {
    await visit('/');

    await click('.book-image');

    await fillIn('input.title', 'a');
    await click('button.edit');
    assert.dom('h3').hasText('a');
    assert.dom('text').hasText('Publisher: Publisher 1');
    await click('.book-image');
    await click('button.delete-button');
  });

  test('navigating using the nav-bar', async function (assert) {
    await visit('/');

    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('BooksRepo');

    await click('nav a.menu-index');
    assert.strictEqual(currentURL(), '/');
  });
});
