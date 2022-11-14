import Component from '../../core/component';

import Header from '../../components/header/header.component';
import Modal from '../../components/modal/modal.component';
import ModalElectiveLecture from '../../components/modal-elective-lecture/modal-elective-lecture.component';
import CategoryCard from '../../components/category-card/category-card.component';
import Mypage from '../../components/mypage/mypage.component';
import { fetchGraduationResult } from '../../async/graduation';
import { parseGraduationResult } from '../../helper/parse';
import Loading from '../../components/loading/loading.component';

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
			isLoading: false,
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
		this.setState({
			isLoading: true,
		});
		try {
			const result = await fetchGraduationResult();

			const parseResult = parseGraduationResult(result);
			this.setState({
				basicUserInfo: parseResult.basicUserInfo,
				categoryList: parseResult.categoryList,
				isLoading: false,
			});
		} catch (error) {
			this.setState({
				isLoading: false,
			});
		}
	}

	isGraduation() {
		const { categoryList } = this.state;
		return (
			categoryList.filter((category) => {
				return category.completed === false;
			}).length === 0
		);
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
		const loading = this.addChild(Loading);
		const categoryCardList = new Array(8).fill().map(() => this.addChild(CategoryCard));

		return (props) => {
			if (props) this.setProps(props);

			const { isLoading, basicUserInfo, selectedCategoryData, categoryList } = this.state;

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
						
				${
					isLoading
						? `<div class="result-page__loading-container">${loading.render()}</div>`
						: `
						<div class="result-page__content">
						<div class="result-page__summary">${mypage.render({ ...basicUserInfo, complete: this.isGraduation() })}</div>
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
								.join('')}
						</div>
						</div>
			`
				}
					</div>
					
				</div>
					`;
		};
	}
}
