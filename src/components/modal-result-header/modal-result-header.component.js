import Component from '../../core/component';

export default class ModalResultHeader extends Component {
	setDefaultProps() {
		this.props = {
			part: '',
			explain: '',
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
               <div class="modal-result-header__title__explain">${explain} 과목 중 미수강한 과목이 표시됩니다.</div>
            </div>
            <div class="modal-result-header__credit">
               <div class="modal-result-header__credit__info"> <span>${takenCredit}</span> / ${totalCredit} </div>  
               <div class="modal-result-header__credit__underline"></div>   
            </div>
			
        </div>
      `;
		};
	}
}
