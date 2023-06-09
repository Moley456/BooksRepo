import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthorRoute extends Route {
  @service store;

  async model(params) {
    return this.store.findRecord('author', params.author_name);
  }
}
