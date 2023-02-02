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
			common: false,
		};
	}

	isNote(partName) {
		const { year } = this.props;
		let text = '';
		if (this.state.common) {
			text = '* 선택 1';
		}
		if (partName === '기독교') {
			year < 20 ? (text = '* 성서와 인간이해(필수)외 선택 1') : (text = '* 선택 2');
		}
		if (partName === '영어') {
			text = '* 교과목(영어, 영어회화)당 1,2 또는 3,4 이수';
		}
		return text;
	}

	getList(props) {
		return props
			.map((prop) => {
				return `
				<div class="loadmap-list__info__category__content__item-list__item">
					<div class="loadmap-list__info__category__content__item-list__item-name">${prop.name}</div>
					<div class="loadmap-list__info__category__content__item-list__item-credit">${prop.credit}학점</div>
				</div>`;
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
							<div class="loadmap-list__info__category__content__item-notice">${this.isNote(partName)}</div>
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
