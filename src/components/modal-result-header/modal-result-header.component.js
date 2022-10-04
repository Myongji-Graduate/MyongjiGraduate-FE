import Component from '../../core/component';

export default class ModalResultHeader extends Component {
	setDefaultProps() {
		this.props = {
			part: '핵심교양',
			explain: '핵심교양 과목 중 미수강한 과목이 표시됩니다.',
			takenCredits: 6,
			totalCredits: 18,
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { part, explain, takenCredits, totalCredits } = this.props;

			return `
        <div class="modal-result-header">
            <div class="modal-result-header__title">
               <div class="modal-result-header__title__part">${part}</div>
               <div class="modal-result-header__title__explain">${explain}</div>
            </div>
            <div class="modal-result-header__credit">
               <div class="modal-result-header__credit__info"> <span>${takenCredits}</span> / ${totalCredits} </div>  
               <div class="modal-result-header__credit__underline"></div>   
            </div>
        </div>
      `;
		};
	}
}
