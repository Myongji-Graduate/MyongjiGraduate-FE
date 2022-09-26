import Component from '../../core/component';

// import './header.style.scss';

export default class Header extends Component {
	initState() {
		this.state = {
			test: 'sh',
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="${this.rootClassName}">
          <div class ="${this.rootClassName}__test">
            header ${this.props} ${this.state.test}
          </div>
        </div>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', `.${this.rootClassName}__test`, () => {
			this.setState({
				test: 'jh',
			});
		});
	}
}
