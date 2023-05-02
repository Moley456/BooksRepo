import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'client/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.API_ENDPOINT;
  headers = { Accept: 'application/json', 'content-type': 'application/json' };
}
