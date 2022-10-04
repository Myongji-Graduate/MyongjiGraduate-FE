import Component from '../../core/component';

export default class ModalResultContent extends Component {
	setDefaultProps() {
		this.props = {
			content: {},
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { content } = this.props;
			const variable = content.detailCategory[0];

			return `
      <div class="modal-result-content">
         <div class="modal-result-content__head">
               <div class="modal-result-content__head__column">과목코드</div>
               <div class="modal-result-content__head__column">교과코드</div>
               <div class="modal-result-content__head__column__3">과목명</div>
               <div class="modal-result-content__head__column">이수구분</div>
               <div class="modal-result-content__head__column">학점</div>
        </div>
        <div class="modal-result-content__body">
        ${variable.haveToTakeElectiveLectures.map(
					(haveToTakeElectiveLecture) =>
						`<div class="modal-result-content__body__tr">
           <div class="modal-result-content__body__tr__column">${haveToTakeElectiveLecture.id}</div>
           <div class="modal-result-content__body__tr__column">${haveToTakeElectiveLecture.code}</div>
           <div class="modal-result-content__body__tr__column__3">${haveToTakeElectiveLecture.title}</div>
           <div class="modal-result-content__body__tr__column">학문기초교양</div>
           <div class="modal-result-content__body__tr__column">${haveToTakeElectiveLecture.credit}</div>
         </div>`
				)}      
        </div>
      </div>
      `;
		};
	}
}
