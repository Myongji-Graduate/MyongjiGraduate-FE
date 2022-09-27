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
        <div class="header">
          <div class ="header__test">
            header ${this.props} ${this.state.test}
          </div>
        </div>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', `.header__test`, () => {
			this.setState({
				test: 'jh',
			});
		});
	}
}
