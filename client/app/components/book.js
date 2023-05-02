import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BookComponent extends Component {
  @action select() {
    this.args.toggleModalView();
    this.args.selectBook();
  }
}
