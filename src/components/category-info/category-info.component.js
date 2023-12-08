import Component from '../../core/component';

export default class CategoryInfo extends Component {
	setDefaultProps() {
		this.props = {
			categoryName: '',
			totalCredits: '',
			takenCredits: '',
			leftCredits: '',
		};
	}

	getCredit() {
		const { totalCredits, takenCredits } = this.props;
		if (totalCredits !== '' && takenCredits !== '') {
			return `<div class="category-info__credit"> ${takenCredits} / ${totalCredits} ${this.getLeftCredit()} </div>`;
		}
		return '';
	}

	getLeftCredit() {
		const { leftCredits } = this.props;
		if (leftCredits === '' || leftCredits === undefined || leftCredits === 0) {
			return '';
		}
		return `(${leftCredits})`;
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { categoryName } = this.props;

			return `
				<div class="category-info">
					<div class="category-info__label">${categoryName}</div>
					${this.getCredit()}
				</div>
      `;
		};
	}
}
