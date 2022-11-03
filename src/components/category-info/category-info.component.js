import Component from '../../core/component';

export default class CategoryInfo extends Component {
	setDefaultProps() {
		this.props = {
			part: '',
			totalCredits: '',
			takenCredits: '',
		};
	}

	getCredit() {
		const { totalCredits, takenCredits } = this.props;
		if (totalCredits !== '' && takenCredits !== '') {
			return `<div class="category-info__credit"> ${takenCredits} / ${totalCredits} </div>`;
		}
		return '';
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { part } = this.props;

			return `
				<div class="category-info">
					<div class="category-info__label">${part}</div>
					${this.getCredit()}
				</div>
      `;
		};
	}
}
