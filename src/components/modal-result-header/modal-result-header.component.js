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
			const { part, completionList, takenCredit, totalCredit } = this.props;

			return `
        <div class="modal-result-header">
            <div class="modal-result-header__title">
               		<div class="modal-result-header__title__part">${part}</div>
					<div class="modal-result-header__title__explain">
						${part} 과목 중 &nbsp;
						<div class="modal-result-header__title__explain__text">${completionList ? `수강` : `미수강`} </div>  
						한 과목이 표시됩니다.
						<label class="modal-result-header__togglebox">
						<span>기수강</span>
						<input role="switch" type="checkbox" class="modal-result-header__toggle" />
						<span>미수강</span>
						</label>						
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
		
		this.addEvent('click', '.modal-result-header__toggle', () => {
			toggleLecture();
			});
	}
}