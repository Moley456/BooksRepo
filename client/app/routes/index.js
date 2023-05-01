import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    console.log(await this.store.findAll('book'));
    return this.store.findAll('book');
  }
}
