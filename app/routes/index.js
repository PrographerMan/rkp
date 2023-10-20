import Route from '@ember/routing/route';
import { later } from '@ember/runloop';

export default class IndexRoute extends Route {
  async model() {
    const options = {
      method: 'GET',
    };

    const res = await fetch('http://localhost:3000/api/results', options);
    const blob = await res.blob();
    const text = await blob.text();
    const json = await JSON.parse(text);

    return json;
  }

  setupController(controller) {
    super.setupController(...arguments);

    later(
      this,
      function () {
        document.addEventListener(
          'scroll',
          () => {
            const offsetTop = window.scrollY;
            const header = document.getElementsByClassName('header')[0];
            let headerFixed = controller.fixedHeader;

            if (offsetTop > header.clientHeight && !headerFixed) {
              controller.fixedHeader = true;
            }

            if (offsetTop < header.clientHeight && headerFixed) {
              controller.fixedHeader = false;
            }
          },
          false
        );
      },
      1000
    );
  }
}
