import Component from '../../core/component';
import CategoryInfo from '../category-info/category-info.component';
import ResultCompleteContent from '../result-complete-content/result-complete-content.component';

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
        ${detailCategory.map(category => {
          let lectures = [];
          if (category.haveToMandatoryLectures.length !== 0) lectures = category.haveToMandatoryLectures;
          if (category.haveToElectiveLectures.length !== 0) lectures = category.haveToElectiveLectures;

          if (category.completed) return `
          <div class="modal-result-content__content">
          <div class="modal-result-content__info">
            ${info.render({part: category.categoryName, totalCredits: category.totalCredits, takenCredits:category.takenCredits})}
            </div>
          ${resultCompleteContent.render()}
          </div>
          `;

          return `
          <div class="modal-result-content__content">
          <div class="modal-result-content__info">
         ${info.render({part: category.categoryName, totalCredits: category.totalCredits, takenCredits:category.takenCredits})}
          </div>         
           <div class="modal-result-content__head">
               <div class="modal-result-content__head__column">과목코드</div>
               <div class="modal-result-content__head__column">과목명</div>
               <div class="modal-result-content__head__column">학점</div>
          </div>
          <div class="modal-result-content__body">
            ${lectures.map(lecture => {
              return `
              <div class="modal-result-content__body__tr">
              <div class="modal-result-content__body__tr__column">${lecture.code}</div>
              <div class="modal-result-content__body__tr__column">${lecture.name}</div>
              <div class="modal-result-content__body__tr__column">${lecture.credit}</div>
              </div>
              `
            })}
          </div>
          </div>
          `

        }).toString().replaceAll(',', '')}
      `;
		};
	}
}