import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  isAddModalOpen = false;
  isEditModalOpen = false;
  selectedBook = {
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
  toggleEditModalView() {
    this.toggleProperty('isEditModalOpen');
  }

  @action
  selectBook(book) {
    this.selectedBook = book;
    console.log(book);
  }
}
