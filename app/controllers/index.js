import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked query = '';
  @tracked fixedHeader = false;
}
