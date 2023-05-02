import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class AddBookFormComponent extends Component {
  @tracked title = '';
  @tracked publisher = '';
  @tracked year = '';
  @tracked authorName = '';
  @tracked isSubmitSuccess = false;
  @tracked isSubmitError = false;

  @service store;

  get disableSubmit() {
    // if any values are empty, don't allow form submission
    return (
      !this.title.length ||
      !this.publisher.length ||
      !this.year.length ||
      !this.authorName.length
    );
  }

  @action async submitForm(event) {
    event.preventDefault();
    console.log('submitted');

    const data = {
      title: this.title,
      publisher: this.publisher,
      year: parseInt(this.year),
      authorId: this.authorName,
    };

    const newBook = this.store.createRecord('book', data);
    newBook.save();

    this.title = '';
    this.publisher = '';
    this.year = '';
    this.authorName = '';
  }
}
