import Component from '../../core/component';
import CategoryInfo from '../category-info/category-info.component';
import ResultCompleteContent from '../result-complete-content/result-complete-content.component';
import ResultLectureTable from '../result-lecture-table/result-lecture-table.component';
import { detailCategoryToKorean } from '../../helper/parse';

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
						const lectures = [];
						if (category.haveToMandatoryLectures.length !== 0) lectures.push(...category.haveToMandatoryLectures);
						if (category.haveToElectiveLectures.length !== 0) lectures.push(...category.haveToElectiveLectures);
						const takenLectures = [];
						if (category.takenMandatoryLectures.length !== 0) takenLectures.push(...category.takenMandatoryLectures);
						if (category.takenElectiveLectures.length !== 0) takenLectures.push(...category.takenElectiveLectures);

						const partName =
							category.detailCategoryName in detailCategoryToKorean
								? detailCategoryToKorean[category.detailCategoryName]
								: category.detailCategoryName;
						return `
			<div class="modal-result-content__content">
				<div class="modal-result-content__info">
					${info.render({
						part: partName,
						totalCredits: category.totalCredits,
						takenCredits: category.takenCredits,
					})}
				</div>
				<div class="modal-result-content__complete-content">
					${
						// eslint-disable-next-line no-nested-ternary
						completionList
							? resultLectureTable.render({
									part: category.detailCategoryName,
									takenLectures,
									lectures,
									completionList,
							  })
							: category.completed
							? resultCompleteContent.render({
									key: index,
							  })
							: resultLectureTable.render({
									lectures,
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
