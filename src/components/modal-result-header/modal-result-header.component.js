import Component from '../../core/component';

export default class ModalResultHeader extends Component {
	setDefaultProps() {
		this.props = {
			part: '',
			takenCredit: 0,
			totalCredit: 0,
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);
			const { part, explain, takenCredit, totalCredit } = this.props;

			return `
        <div class="modal-result-header">
            <div class="modal-result-header__title">
               <div class="modal-result-header__title__part">${part}</div>
					<div class="modal-result-header__title__explain">
						${part} 과목 중 &nbsp;
						<div class="modal-result-header__title__explain__text">${explain ? `수강` : `미수강`} </div>  
						한 과목이 표시됩니다.
						<div class="modal-result-header__title__explain__toggle">🔎${explain ? `미수강` : `수강`}과목 보기</div>
					</div>
					         
			</div>
            <div class="modal-result-header__credit">
               <div class="modal-result-header__credit__info"> <span>${takenCredit}</span> / ${totalCredit} </div>  
               <div class="modal-result-header__credit__underline"></div>   
            </div>
			
        </div>
      `;
		};
	}

	setEvent() {
		const { toggleLecture } = this.props;
		this.addEvent('click', '.modal-result-header__title__explain__toggle', () => {
			toggleLecture();
		});
	}
}
