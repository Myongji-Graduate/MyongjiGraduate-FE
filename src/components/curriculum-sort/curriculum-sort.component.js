import Component from '../../core/component';
import Credit from '../credit/credit.component';
import { categoryNameToKorean } from '../../helper/parse';

export default class CurriculumSort extends Component {
	setDefaultProps() {
		this.props = {};
	}

	getList() {
		const creditComponent = this.addChild(Credit);
		const keys = Object.keys(this.props);
		const values = Object.values(this.props);
		return values
			.map((credit, index) => {
				return `
		<div class="curriculum-sort__list-item">${creditComponent.render({
			title: categoryNameToKorean[keys[index].slice(0, -6)],
			value: credit,
		})}</div>
		`;
			})
			.join('');
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);
			return `
        <div class="curriculum-sort">        
		  <div class="curriculum-sort__title">분류</div>
		  <div class="curriculum-sort__list">
		 ${this.getList()}
		 </div>
        </div>
      `;
		};
	}
}
