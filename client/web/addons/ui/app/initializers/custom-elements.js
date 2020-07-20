import { Button } from '@shoelace-style/shoelace/dist/collection/components/button/button';
import { Switch } from '@shoelace-style/shoelace/dist/collection/components/switch/switch';

export default {
  initialize() {
    if (window && window.customElements) {
      console.log(Button);
      window.customElements.define('sl-button', Button);
      window.customElements.define('sl-switch', Switch);
    }
  },
};
