import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';
import IdentityService from 'emberclear/services/identity/service';

export default class ContactsRoute extends Route {
  @service identity!: IdentityService;

  // ensure we are allowed to be here
  async beforeModel() {
    const exists = await this.identity.exists();

    if (!exists) {
      this.transitionTo('setup');
    }
  }

  async model(this: ContactsRoute) {
    const records = await this.store.findAll('identity', { backgroundReload: true })
    const filtered = records.filter(identity => {
      return identity.id !== this.identity.id;
    });

    return filtered;
  }
}