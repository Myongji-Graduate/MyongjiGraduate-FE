import Component from '../../core/component';

export default class ModalResultContent extends Component {
	setDefaultProps() {
		this.props = {
			detailCategory: [],
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { detailCategory } = this.props;

			return `
      <div class="modal-result-content">
        ${detailCategory.map(category => {
          let lectures = [];
          if (category.haveToMandatoryLectures.length !== 0) lectures = category.haveToMandatoryLectures;
          if (category.haveToElectiveLectures.length !== 0) lectures = category.haveToElectiveLectures;

          return `
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
          `

        }).toString().replaceAll(',', '')}
      `;
		};
	}
}
//logic수정하기