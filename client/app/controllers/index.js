import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  isModalOpen = false;
  selectedBook = {
    title: 'blank',
    publisher: 'blank',
    year: 0,
    authorName: 'blank',
  };

  @action
  toggleModalView() {
    this.toggleProperty('isModalOpen');
  }

  @action
  selectBook(book) {
    this.selectedBook = book;
  }
}
