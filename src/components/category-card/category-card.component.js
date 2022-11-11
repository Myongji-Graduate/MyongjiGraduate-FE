import Component from '../../core/component';

import PieChart from '../pie-chart/pie-chart.component';

import Button from '../button/button.component';
import { buttonTypes } from '../../helper/types';
import { getResponseiveImage } from '../../helper/images';

const sizes = {//추후수정
	mobile: 650,
	tablet: 1008,
	sm: 1440,
	md: 1920,
	lg: 1920,
};

const [sizesAttr, srcsetAttr] = getResponseiveImage( sizes, `${IMAGE_URL}/icons/book-icon.svg`);

export default class CategoryCard extends Component {
	setDefaultProps() {
		this.props = {
			title: '공통교양',
			key: 1,
			totalCredit: 30,
			takenCredit: 12,
			buttonOnClick: () => {},
		};
	}

	template() {
		const pieChart = this.addChild(PieChart);
		const createModalButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);

			const { title, totalCredit, takenCredit, key, buttonOnClick } = this.props;
			const percentage = Math.round((takenCredit / totalCredit) * 100);

			const pieChartProps = {
				percentage,
			};

			const createModalButtonProps = {
				content: '미이수과목 확인',
				type: buttonTypes.primary,
				size: 'sm',
				key,
				onClick: buttonOnClick,
			};

			return `
        <div class="category-card__${key} category-card">
          <div class="category-card__header">
            <div class="category-card__icon-container">
              <img sizes="${sizesAttr}" srcset="${srcsetAttr}" class="category-card__icon" alt="category-card__icon" />
            </div>
            ${title}
          </div>
          <div class="category-card__body">
            <div class="category-card__pie-chart-container">
              ${pieChart.render(pieChartProps)}
            </div>
          </div>
          <div class="category-card__footer">
            <div class="category-card__display-credits">
              <div class="category-card__total-credits-container">
                <div class="category-card__row-text">기준학점</div>
                <div class="category-card__row-total-credits">${totalCredit}</div>
              </div>
              <div class="category-card__taken-credits-container">
                <div class="category-card__row-text">이수학점</div>
                <div class="category-card__row-taken-credits">${takenCredit}</div>
              </div>
            </div>
            <div class="category-card__create-modal-button">
              ${createModalButton.render(createModalButtonProps)}
            </div>
          </div>
        </div>
      `;
		};
	}
}
