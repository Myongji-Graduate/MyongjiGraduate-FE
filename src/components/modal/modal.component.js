import Component from '../../core/component';


import * as utils from '../../helper/utils';
import { getResponseiveImage } from '../../helper/images';

const sizes = {//추후수정
	mobile: 50,
	tablet: 50,
	sm: 50,
	md: 60,
	lg: 70,
};

const [sizesAttr, srcsetAttr] = getResponseiveImage( sizes, `${IMAGE_URL}/images/close_btn.svg`);

export default class Modal extends Component {
	setDefaultProps() {
		this.props = {
			width: 1060,
			padding: 200,
			isModalShow: false,
			isShowCloseBtn: false,
			contentComponent: {},
			contentComponentProps: undefined,
			key: 'init',
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
        <div class="${this.createKeyClass()} modal" style=${utils.getInlineStyle(modalStyle)}>
         <div class="modal__body" style=${utils.getInlineStyle(modalBodyStyle)}>
         ${isShowCloseBtn ? `<img class='modal__close-btn' sizes="${sizesAttr}" srcset="${srcsetAttr}" alt="modal__close-btn" />` : ''}
         <div class="modal__body-content">
         ${contentComponent.render(contentComponentProps)}
         </div>
           </div>                 
        </div>    
        `;
		};
	}

	createKeyClass() {
		const { key } = this.props;
		return `modal_${key}`;
	}

	setEvent() {
		const { toggleModal } = this.props;
		this.addEvent('click', '.modal__close-btn', () => {
			if (toggleModal) toggleModal();
		});

		this.addEvent(
			'click',
			`.${this.createKeyClass()}`,
			() => {
				if (toggleModal) toggleModal();
			},
			true
		);
	}
}
