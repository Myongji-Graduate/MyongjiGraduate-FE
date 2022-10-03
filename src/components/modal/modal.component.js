import Component from '../../core/component';

import closeBtn from '../../../public/icons/close_btn.svg';

import * as utils from '../../helper/utils';

export default class Modal extends Component {
	setDefaultProps() {
		this.props = {
			width: 1060,
			padding: 200,
			isModalShow: false,
			isShowCloseBtn: false,
			contentComponent: {},
			contentComponentProps: undefined
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { width, padding, isModalShow, isShowCloseBtn, contentComponent, contentComponentProps } = this.props;

			const modalStyle = {
				display: isModalShow ? 'block' : 'none',
			};

			const modalBodyStyle = {
				width: `${utils.convertPXToREM(width)}rem`,
				padding: `${utils.convertPXToREM(padding)}rem`,
			};

			return `
        <div class="modal" style=${utils.getInlineStyle(modalStyle)}>
         <div class="modal__body" style=${utils.getInlineStyle(modalBodyStyle)}>
         ${isShowCloseBtn ? `<img class='modal__close-btn' src=${closeBtn} />` : ''}
         <div class="modal__body-content">
         ${contentComponent.render(contentComponentProps)}
         </div>
           </div>                 
        </div>    
        `;
		};
	}

	setEvent() {
		const { toggleModal } = this.props;
		this.addEvent('click', '.modal__close-btn', () => {
			if (toggleModal) toggleModal();
		});

		this.addEvent('click', '.modal', () => {
			if (toggleModal) toggleModal();
		}, true);
	}
}
