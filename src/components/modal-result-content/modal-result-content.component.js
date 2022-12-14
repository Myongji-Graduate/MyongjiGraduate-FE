import Component from '../../core/component';
import CategoryInfo from '../category-info/category-info.component';
import ResultCompleteContent from '../result-complete-content/result-complete-content.component';
import ResultLectureTable from '../result-lecture-table/result-lecture-table.component';
import { detailCategoryToKorean } from '../../helper/parse';

export default class ModalResultContent extends Component {
	setDefaultProps() {
		this.props = {
			detailCategory: [],
		};
	}

	template() {
		const resultCompleteContent = this.addChild(ResultCompleteContent);
		const info = this.addChild(CategoryInfo);
		const resultLectureTable = this.addChild(ResultLectureTable);

		return (props) => {
			if (props) this.setProps(props);
			const { detailCategory } = this.props;

			return `
      <div class="modal-result-content">
        ${detailCategory
					.map((category, index) => {
						let lectures = [];
						if (category.haveToMandatoryLectures.length !== 0) lectures = category.haveToMandatoryLectures;
						if (category.haveToElectiveLectures.length !== 0) lectures = category.haveToElectiveLectures;
						const partName =
							category.detailCategoryName in detailCategoryToKorean
								? detailCategoryToKorean[category.detailCategoryName]
								: category.detailCategoryName;
						if (category.completed)
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
          ${resultCompleteContent.render({
						key: index,
					})}
          </div>
          </div>
          `;

						return `
          <div class="modal-result-content__content">
          <div class="modal-result-content__info">
         ${info.render({
						part: partName,
						totalCredits: category.totalCredits,
						takenCredits: category.takenCredits,
					})}
          </div>
					${resultLectureTable.render({
						lectures,
					})}
          </div>
          `;
					})
					.join('')}
      `;
		};
	}
}
