import Component from '../../core/component';

export default class CategoryLabel extends Component {
	setDefaultProps() {
		this.props = {
			part: '',
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { part } = this.props;

			return `
		   <div class="category-name-label">${part}</div>
      `;
		};
	}
}
