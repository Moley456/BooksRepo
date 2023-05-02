import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class AddBookFormComponent extends Component {
  @tracked title = this.args.selectedBook ? this.args.selectedBook.title : '';
  @tracked publisher = this.args.selectedBook
    ? this.args.selectedBook.publisher
    : '';
  @tracked year = this.args.selectedBook
    ? this.args.selectedBook.year.toString()
    : '';
  @tracked authorName = this.args.selectedBook
    ? this.args.selectedBook.authorId
    : '';
  @tracked isSubmitSuccess = false;
  @tracked isSubmitError = false;

  @service store;

  get disableSubmit() {
    // if any values are empty, don't allow form submission
    return (
      !this.title.length ||
      !this.publisher.length ||
      !this.year.length ||
      parseInt(this.year) > 9999 ||
      !this.authorName.length
    );
  }

  @action async submitAddForm(event) {
    event.preventDefault();

    const data = {
      title: this.title,
      publisher: this.publisher,
      year: parseInt(this.year),
      authorId: this.authorName,
    };

    let book = this.store.createRecord('book', data);
    book.save().then(
      () => this.onSuccess(),
      () => {
        this.onError();
        book.deleteRecord();
      }
    );
  }

  @action async submitEditForm(event) {
    event.preventDefault();

    this.args.selectedBook.title = this.title;
    this.args.selectedBook.publisher = this.publisher;
    this.args.selectedBook.year = parseInt(this.year);
    this.args.selectedBook.authorId = this.authorName;

    this.args.selectedBook.save().then(
      () => this.onSuccess(),
      () => {
        this.onError();
        book.rollbackAttributes();
      }
    );
  }

  @action async deleteBook(event) {
    event.preventDefault();
    const book = this.args.selectedBook;
    book.deleteRecord();
    book.save().then(
      () => this.onSuccess(),
      () => {
        this.onError();
        this.store.createRecord('book', book);
      }
    );
  }

  onSuccess() {
    // successfully saved
    this.isSubmitSuccess = true;
    this.isSubmitError = false;
    if (this.args.type == 'edit') {
      this.args.closeForm();
    }
    this.cleanUpForm();
  }

  onError() {
    this.isSubmitSuccess = false;
    this.isSubmitError = true;
  }

  cleanUpForm() {
    this.title = '';
    this.publisher = '';
    this.year = '';
    this.authorName = '';
  }
}
