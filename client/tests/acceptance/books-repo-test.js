import {module, test} from 'qunit';
import {visit, currentURL} from '@ember/test-helpers';
import {setupApplicationTest} from 'client/tests/helpers';

module('Acceptance | books repo', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /books-repo', async function (assert) {
    await visit('/books-repo');

    assert.strictEqual(currentURL(), '/books-repo');
  });
});
