import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class AuthorController extends Controller {
  @service store;
  @service router;
  @tracked isDeleteError = false;
  @tracked isEditError = false;
  isEditName = false;

  get disableSubmit() {
    return !this.model.name.length || !this.model.name.length;
  }

  @action toggleEditName() {
    this.toggleProperty('isEditName');
  }

  //TODO
  @action async editName() {
    this.model.save().then(
      () => {
        this.toggleEditName();
      },
      () => {
        this.model.rollbackAttributes();
      }
    );
  }

  @action async editBio() {
    this.model.save().then(
      () => {},
      () => this.model.rollbackAttributes()
    );
  }

  @action async deleteAuthor() {
    this.model.deleteRecord();
    this.model.save().then(
      () => {
        this.router.transitionTo('index');
      },
      () => {
        this.DeleteError = true;
      }
    );
  }
}
