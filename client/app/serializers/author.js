import JSONSerializer from '@ember-data/serializer/json';

export default class AuthorSerializer extends JSONSerializer {
  primaryKey = 'name';
}
