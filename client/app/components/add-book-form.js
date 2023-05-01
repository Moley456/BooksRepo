import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AddBookFormComponent extends Component {
  @tracked title = '';
  @tracked publisher = '';
  @tracked year = '';
  @tracked authorName = '';

  @action async submitForm() {
    const data = {
      title: this.title,
      publisher: this.publisher,
      year: parseInt(this.year),
      authorName: this.authorName,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      // handle success
    } else {
      // handle error
    }
  }
}
