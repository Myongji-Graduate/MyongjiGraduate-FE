import Component from '../../core/component';
import CategoryInfo from '../category-info/category-info.component';
import ResultCompleteContent from '../result-complete-content/result-complete-content.component';
import ResultLectureTable from '../result-lecture-table/result-lecture-table.component';

export default class ModalResultContent extends Component {
	setDefaultProps() {
		this.props = {
			detailCategory: [],
			completionList: false,
		};
	}

	template() {
		const resultCompleteContent = this.addChild(ResultCompleteContent);
		const info = this.addChild(CategoryInfo);
		const resultLectureTable = this.addChild(ResultLectureTable);

		return (props) => {
			if (props) this.setProps(props);
			const { detailCategory, completionList } = this.props;

			return `
      <div class="modal-result-content">
        ${detailCategory
					.map((category, index) => {
						const { haveToLectures, takenLectures } = category;
						return `
			<div class="modal-result-content__content">
				<div class="modal-result-content__info">
					${info.render({
						categoryName: category.categoryName,
						totalCredits: category.totalCredits,
						takenCredits: category.takenCredits,
						leftCredits: category.leftCredit,
					})}
				</div>
				<div class="modal-result-content__complete-content">
					${
						// eslint-disable-next-line no-nested-ternary
						completionList
							? resultLectureTable.render({
									part: category.detailCategoryName,
									takenLectures,
									lectures: haveToLectures,
									completionList,
							  })
							: category.completed
							? resultCompleteContent.render({
									key: index,
							  })
							: resultLectureTable.render({
									lectures: haveToLectures,
									completionList,
							  })
					} 
				</div>
			</div>
			`;
					})
					.join('')}
      </div>`;
		};
	}
}
