import Component from '../../core/component';

import PieChart from '../pie-chart/pie-chart.component';

import Button from '../button/button.component';
import { buttonTypes } from '../../helper/types';
import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 10,
	tablet: 12,
	sm: 12,
	md: 15,
	lg: 20,
};

const [sizesAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/book-icon.svg`);

export default class CategoryCard extends Component {
	setDefaultProps() {
		this.props = {
			categoryName: '공통교양',
			key: 1,
			degree: undefined,
			totalCredit: 30,
			takenCredit: 12,
			buttonOnClick: () => {},
		};
	}

	hasDetails() {
		const { categoryName } = this.props;
		if (categoryName === '일반교양' || categoryName === '자유선택' || categoryName === '채플') return false;
		return true;
	}

	isChaple() {
		const { categoryName } = this.props;
		if (categoryName === '채플') return true;
		return false;
	}

	template() {
		const pieChart = this.addChild(PieChart);
		const createModalButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);

			const { categoryName, degree, totalCredit, takenCredit, key, buttonOnClick } = this.props;
			const percentage = Math.round((takenCredit / totalCredit) * 100);
			const pieChartProps = {
				percentage,
			};

			const createModalButtonProps = {
				content: '과목 확인',
				type: buttonTypes.primary,
				size: 'sm',
				key,
				onClick: buttonOnClick,
			};
			return `
        <div class="category-card__${key} category-card">
          <div class="category-card__header">
            <div class="category-card__icon-container">
             ${
								degree
									? `<div class="category-card__icon__text">${degree}</div>`
									: `	<img
					sizes="${sizesAttr}"
					srcset="${srcsetAttr}"
					class="category-card__icon"
					alt="category-card__icon"
				/>`
							} 
            </div>
            ${categoryName}
          </div>
          <div class="category-card__body">
            <div class="category-card__pie-chart-container">
              ${pieChart.render(pieChartProps)}
            </div>
          </div>
          <div class="category-card__footer">
            <div class="category-card__display-credits">
              <div class="category-card__total-credits-container">
                <div class="category-card__row-text">${this.isChaple() ? '기준횟수' : '기준학점'}</div>
                <div class="category-card__row-total-credits">${totalCredit}</div>
              </div>
              <div class="category-card__taken-credits-container">
                <div class="category-card__row-text">${this.isChaple() ? '이수횟수' : '이수학점'}</div>
                <div class="category-card__row-taken-credits">${takenCredit}</div>
              </div>
            </div>
						${
							this.hasDetails()
								? `
						<div class="category-card__create-modal-button">
              ${createModalButton.render(createModalButtonProps)}
            </div>`
								: ''
						}

          </div>
        </div>
      `;
		};
	}
}
