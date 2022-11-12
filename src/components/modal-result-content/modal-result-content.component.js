import Component from '../../core/component';
import CategoryInfo from '../category-info/category-info.component';
import ResultCompleteContent from '../result-complete-content/result-complete-content.component';
import LectureTable from '../lecture-table/lecture-table.component';

export default class ModalResultContent extends Component {
	setDefaultProps() {
		this.props = {
			detailCategory: [],
		};
	}

	template() {
		const resultCompleteContent = this.addChild(ResultCompleteContent);

		return (props) => {
			if (props) this.setProps(props);
			const info = this.addChild(CategoryInfo);
			const { detailCategory } = this.props;

			return `
      <div class="modal-result-content">
        ${detailCategory
					.map((category) => {
						let lectures = [];
						if (category.haveToMandatoryLectures.length !== 0) lectures = category.haveToMandatoryLectures;
						if (category.haveToElectiveLectures.length !== 0) lectures = category.haveToElectiveLectures;

						if (category.completed)
							return `
          <div class="modal-result-content__content">
          <div class="modal-result-content__info">
            ${info.render({
							part: category.categoryName,
							totalCredits: category.totalCredits,
							takenCredits: category.takenCredits,
						})}
            </div>
          <div class="modal-result-content__complete-content">
          ${resultCompleteContent.render()}
          </div>
          </div>
          `;

						return `
          <div class="modal-result-content__content">
          <div class="modal-result-content__info">
         ${info.render({
						part: category.categoryName,
						totalCredits: category.totalCredits,
						takenCredits: category.takenCredits,
					})}
          </div>
					${LectureTable.render({
						lectures,
					})}
          </div>
          `;
					})
					.toString()
					.replaceAll(',', '')}
      `;
		};
	}
}
