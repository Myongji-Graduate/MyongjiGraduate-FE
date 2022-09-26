import Component from '../../core/component';

// import './header.style.scss';

export default class Header extends Component {
	render() {
		return (props) => {
			this.setProps(props);

			return `
        <div class="header">
          header ${props}
        </div>
      `;
		};
	}
}
