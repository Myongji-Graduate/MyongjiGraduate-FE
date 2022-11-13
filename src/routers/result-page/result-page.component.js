import Component from '../../core/component';

import Header from '../../components/header/header.component';
import Modal from '../../components/modal/modal.component';
import ModalElectiveLecture from '../../components/modal-elective-lecture/modal-elective-lecture.component';
import CategoryCard from '../../components/category-card/category-card.component';
import Mypage from '../../components/mypage/mypage.component';
import { fetchGraduationResult } from '../../async/graduation';
import { parseGraduationResult } from '../../helper/parse';

export default class ResultPage extends Component {
	initState() {
		this.state = {
			isModalShow: false,
			selectedCategoryData: {
				takenCredits: 0,
				totalCredits: 0,
				detailCategory: [],
			},
			basicUserInfo: {
				name: '',
				studentNumber: '',
				department: '',
				totalCredit: 0,
				takenCredit: 0,
			},
			categoryList: [],
		};
	}

	toggleModal() {
		this.setState({
			isModalShow: !this.state.isModalShow,
		});
	}

	componentDidMount() {
		this.fetchData();
	}

	async fetchData() {
		try {
			const result = await fetchGraduationResult();
			const parseResult = parseGraduationResult(result);
			console.log(parseResult);
			this.setState({
				basicUserInfo: parseResult.basicUserInfo,
				categoryList: parseResult.categoryList,
			});
		} catch (error) {}
	}

	clickCategoryButton(index) {
		const { categoryList } = this.state;
		const categoryData = { ...categoryList[index] };

		this.setState({
			selectedCategoryData: categoryData,
			isModalShow: true,
		});
	}

	template() {
		const header = this.addChild(Header);
		const modal = this.addChild(Modal);
		const modalElectiveLecture = this.addChild(ModalElectiveLecture);
		const mypage = this.addChild(Mypage);
		const categoryCardList = new Array(7).fill().map(() => this.addChild(CategoryCard));

		return (props) => {
			if (props) this.setProps(props);

			const { basicUserInfo, selectedCategoryData, categoryList } = this.state;

			const modalContentProps = {
				part: selectedCategoryData.categoryName,
				categoryData: selectedCategoryData,
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
					key: 'lecture',
				})}
				</div>
					<div class="result-page__header">
           			 ${header.render()}           
        			  </div>
					<div class="result-page__body">
						<div class="result-page__content">
						<div class="result-page__summary">${mypage.render({ ...basicUserInfo })}</div>
							<div class="result-page__category-grid-container">
								${categoryList
									.map(({ categoryName, totalCredit, takenCredit }, index) => {
										return categoryCardList[index].render({
											title: categoryName,
											totalCredit,
											takenCredit,
											key: index + 1,
											buttonOnClick: this.clickCategoryButton.bind(this, index),
										});
									})
									.toString()
									.replaceAll(',', '')}
							</div>
						</div>
					</div>
				</div>
					`;
		};
	}
}
