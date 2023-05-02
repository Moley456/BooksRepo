import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BookComponent extends Component {
  @action select(book) {
    this.args.toggleForm();
    this.args.selectBook(book);
  }
}
