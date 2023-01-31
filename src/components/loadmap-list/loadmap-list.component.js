import Component from '../../core/component';
import * as utils from '../../helper/utils';
import { detailCategoryToKorean, categoryNameToKorean } from '../../helper/parse';

export default class LoadmapList extends Component {
	setDefaultProps() {
		this.props = {
			lecture: [],
		};
	}

	initState() {
		this.state = {
			common: true,
		};
	}

	getList(props) {
		return props
			.map((prop) => {
				return `<div class="loadmap-list__info__category__content__item-list__item">${prop.name}</div>`;
			})
			.join('');
	}

	getTable() {
		const { common } = this.state;
		const { lecture } = this.props;
		return (
			lecture &&
			Object.values(common ? lecture[1] : lecture[0])
				.map((obj) => {
					return `
		<div class="loadmap-list__info__category">
			<div class="loadmap-list__info__category__categoryName">${categoryNameToKorean[Object.keys(obj)[0]]}</div>
			<div class="loadmap-list__info__category__content">
			${Object.values(obj)[0]
				.map((value) => {
					const partName =
						value.categoryName in detailCategoryToKorean
							? detailCategoryToKorean[value.categoryName]
							: value.categoryName;
					return `<div class="loadmap-list__info__category__content__item">
							<div class="loadmap-list__info__category__content__item-detailcatogory">${partName}</div>
							<div class="loadmap-list__info__category__content__item-list">${this.getList(value.lectures)}</div>
							</div>`;
				})
				.join('')}
			</div>
		</div>`;
				})
				.join('')
		);
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);
			const { common } = this.state;
			const barStyle = { right: common ? '1.3rem' : '6.7rem' };
			return `
        <div class="loadmap-list">        
		  <div class="loadmap-list__title">과목 정보</div>
		  <div class="loadmap-list__content">
			<div class="loadmap-list__content__bar" style=${utils.getInlineStyle(barStyle)}></div>
			<div class="loadmap-list__content__option"> 
				<div class="loadmap-list__content__option-major" style="color:${common ? '#9F9F9F' : '#7590FF'};">전필/전선/학기교</div>
				<div class="loadmap-list__content__option-culture" style="color:${common ? '#7590FF' : '#9F9F9F'};">핵심/공통교양</div>
			</div>
		  </div>
		  <div class="loadmap-list__info"> ${this.getTable()}  </div>
        </div>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', '.loadmap-list__content__option-major', () => {
			this.setState({ common: false });
		});
		this.addEvent('click', '.loadmap-list__content__option-culture', () => {
			this.setState({ common: true });
		});
	}
}
