import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ListComponent extends Component {
  @tracked isListEmpty = false;

  get filteredModels() {
    this.isListEmpty = false;

    let query = this.args.query.trim().toLowerCase();
    let models = this.args.models;

    if (query && query.length > 3) {
      models = models.filter((model) =>
        model.NAME.toLowerCase().includes(query)
      );
    }

    if (models.length === 0) this.isListEmpty = true;

    return models;
  }
}
