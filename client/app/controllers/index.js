import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const titleSort = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

export default class IndexController extends Controller {
  isAddModalOpen = false;
  isEditOpen = false;
  @tracked selectedBook = {
    title: 'blank',
    publisher: 'blank',
    year: 0,
    authorName: 'blank',
  };

  @action
  toggleAddModalView() {
    this.toggleProperty('isAddModalOpen');
  }

  @action
  toggleEditView() {
    this.toggleProperty('isEditOpen');
  }

  @action
  selectBook(book) {
    this.selectedBook = book;
  }

  get sortedBooks() {
    return this.model.slice().sort(titleSort);
  }
}
