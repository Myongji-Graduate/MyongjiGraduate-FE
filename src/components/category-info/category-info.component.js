import Component from '../../core/component';

export default class CategoryInfo extends Component {
	setDefaultProps() {
		this.props = {
			part: '',
			totalCredits: '',
			takenCredits: '',
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { part, totalCredits, takenCredits } = this.props;

			return `
		<div class="category-info">
		   <div class="category-info__label">${part}</div>
		   <div class="category-info__credit"> ${takenCredits} / ${totalCredits} </div>
		</div>
      `;
		};
	}
}
