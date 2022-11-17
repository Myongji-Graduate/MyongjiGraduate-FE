import Component from './core/component';
import ModalError from './components/modal-error/modal-error.component';
import ModalSuccess from './components/modal-success/modal-success.component';

export default class App extends Component {
	getChildComponent() {
		return this.children[this.children.length - 1];
	}

	setChildComponent(component) {
		this.children[this.children.length - 1] = component;
	}

	initChildComponent(component) {
		this.children.push(component);
	}

	template() {
		const modalError = this.addChild(ModalError);
		const modalSuccess = this.addChild(ModalSuccess);
		return (props) => {
			if (props) this.setProps(props);

			const childComponent = this.getChildComponent();

			return `
        <div class="app">
          <div class="app__eror-modal">
            ${modalError.render()}
          </div>
		  <div class="app__success-modal">
		  ${modalSuccess.render()}
		  </div>
          ${childComponent.render()}
		  
        </div>
      `;
		};
	}
}
