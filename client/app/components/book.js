import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BookComponent extends Component {
  @action select(book) {
    this.args.toggleModalView();
    this.args.selectBook(book);
  }
}
