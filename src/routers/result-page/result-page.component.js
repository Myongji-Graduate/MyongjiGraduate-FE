import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';
import Modal from '../../components/modal/modal.component';
import ModalElectiveLecture from '../../components/modal-elective-lecture/modal-elective-lecture.component';
import CategoryCard from '../../components/category-card/category-card.component';

import { store } from '../../store/store';

import informationBackgroundImage from '../../../public/images/sub-background.png'
import backgroundBottomImage from '../../../public/images/header-bottom.png';

export default class ResultPage extends Component {
	initState() {
		this.state = {
			isModalShow: false,
			selectedCategoryData: {
				takenCredits: 0,
				totalCredits: 0,
				detailCategory: []
			},
		};
	}

	toggleModal() {
		this.setState({
			isModalShow: !this.state.isModalShow,
		});
	}

	clickCategoryButton(index) {
		console.log(index);
		const { categoryList } = store.getState();
		const categoryData = {...categoryList[index]};

		this.setState({
			selectedCategoryData: categoryData,
			isModalShow: true,
		});
	}

	template() {
		const gnb = this.addChild(GNB);
		const modal = this.addChild(Modal);
		const modalElectiveLecture = this.addChild(ModalElectiveLecture);
		const categoryCardList = new Array(7).fill().map(() => this.addChild(CategoryCard));
		// const categoryCardList = this.addChild(CategoryCard);

		return (props) => {
			if (props) this.setProps(props);

			const { selectedCategoryData } = this.state;
			const { basicUserInfo, categoryList } = store.getState();
			console.log('basic', basicUserInfo);
			console.log('category', categoryList);

			const modalContentProps = {
				part: selectedCategoryData.categoryName,
				categoryData: selectedCategoryData
			};

			
			return `
			<div class="result-page">
				<div class="result-page__modal-container">
				${modal.render({
					isModalShow: this.state.isModalShow,
					toggleModal: this.toggleModal.bind(this),
					contentComponent: modalElectiveLecture,
					contentComponentProps: modalContentProps,
					width: 1480,
					padding: 90,
				})}
				</div>
					<div class="result-page__header">
            ${gnb.render()}
            <img src=${informationBackgroundImage} class="result-page__background-img" />
            <img src=${backgroundBottomImage} class="result-page__bottom-img" />
          </div>
					<div class="result-page__body">
						<div class="result-page__content">
							<div class="result-page__summary"></div>
							<div class="result-page__category-grid-container">
								${categoryList.map(({categoryName, totalCredit, takenCredit}, index) => {
									return categoryCardList[index].render({
										title: categoryName,
										totalCredit,
										takenCredit,
										key: index+1,
										buttonOnClick: this.clickCategoryButton.bind(this, index)
									});
								}).toString().replaceAll(',', '')}
							</div>
						</div>
					</div>
				</div>
					`;
		};
	}
}
