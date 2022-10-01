import Component from "./core/component";

import { router } from './routers';
import GNB from "./components/GNB/GNB.component";

export default class App extends Component {

  template() {
    const pageComponent = this.addChild(router.browserRender());
    const gnb = this.addChild(GNB);

		return (props) => {
			if (props) this.setProps(props);

      const newpageComponent = new router.browserRender()();
      console.log(newpageComponent);
      this.children[0] = newpageComponent;


			return `
          <div class="app">
            ${gnb.render()}
            ${newpageComponent.render()}
          </div>
      `;
		};
	}
}