import Component from '../../core/component';

import * as utils from '../../helper/utils';

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
			const style = {
				color: completionList ? 'white' : 'gray',
				left: completionList ? '-2.4rem' : '-1.5rem',
			};

			if (typeof document !== 'undefined') {
				const idcheck = document.getElementById('modal-result-header__toggle');
				// eslint-disable-next-line no-unused-expressions
				if (idcheck) completionList ? (idcheck.checked = true) : (idcheck.checked = false);
			}

			return `
        <div class="modal-result-header">
            <div class="modal-result-header__title">
               		<div class="modal-result-header__title__part">${part}</div>
					<div class="modal-result-header__title__explain">
						<div class="modal-result-header__toggle-part">${part} 과목 중 &nbsp;</div>
						<div class="modal-result-header__toggle-set" >
							<input role="switch" type="checkbox" class="modal-result-header__toggle" id="modal-result-header__toggle" name='test' value='test' />
							<div class="modal-result-header__toggle-text" style="${utils.getInlineStyle(style)}">${
				completionList ? '기이수' : '미이수'
			}</div>
						</div>
						<div class="modal-result-header__toggle-explain"> 과목이 표시됩니다.</div>
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

		this.addEvent('click', '.modal-result-header__toggle-set', () => {
			toggleLecture();
		});
	}
}
