import Model, { attr } from '@ember-data/model';

export default class BookModel extends Model {
  @attr title;
  @attr publisher;
  @attr year;
  @attr authorId;
}
