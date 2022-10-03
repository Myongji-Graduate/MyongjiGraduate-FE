import Component from '../../core/component';

export default class ModalResultContent extends Component {
	setDefaultProps() {
		this.props = {
			subjectCode: [1023, 1024],
			curriculumCode: ['교필137', '교필137'],
			subjectName: ['ICT비즈니스와 경영', '융합공학입문설계'],
			division: ['전필', '전필'],
			credit: [3, 3],
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { subjectCode, curriculumCode, subjectName, division, credit } = this.props;

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
             <div class="modal-result-content__body__tr"> 
               <div class="modal-result-content__body__tr__column">${subjectCode[0]}</div>
               <div class="modal-result-content__body__tr__column">${curriculumCode[0]}</div>
               <div class="modal-result-content__body__tr__column__3">${subjectName[0]}</div>
               <div class="modal-result-content__body__tr__column">${division[0]}</div>
               <div class="modal-result-content__body__tr__column">${credit[0]}</div>
             </div>
        </div>        
      </div>
      `;
		};
	}
}
// for each문 || component하나 더파서 render로 수정 -> 마지막 div에 style border-bottom none처리
// 선배 진짜 코드 너무 더러운데 classname 이거 맞아요? 8 (ᵒ̌▱ ๋ ᵒ̌) ა
