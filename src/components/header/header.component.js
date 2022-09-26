import Component from '../../core/component';

// import './header.style.scss';

export default class Header extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="${this.rootClassName}">
          header ${props}
        </div>
      `;
		};
	}
}
