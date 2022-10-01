import Component from '../../core/component';

import closeBtn from '../../../public/icons/close_btn.svg';

import * as utils from '../../helper/utils';

export default class modal extends Component {

   setDefaultProps() {
      this.props = {
         width: 1060,
         padding: 200,
         isModalShow: false,
         isShowCloseBtn: false,
         contentComponent: {},
      }
   }

	template() {
		return (props) => {
			if (props) this.setProps(props);

         const { width, padding, isModalShow, isShowCloseBtn, contentComponent } = this.props;
         
         const modalStyle = {
            display: isModalShow ? 'block' : 'none'
         }

         const modalBodyStyle = {
            width: `${utils.convertPXToREM(width)}rem`,
            padding: `${utils.convertPXToREM(padding)}rem`,
         }

			return `
        <div class="modal" style=${utils.getInlineStyle(modalStyle)}>
         <div class="modal__body" style=${utils.getInlineStyle(modalBodyStyle)}>
         ${isShowCloseBtn ? `<img class='modal__close-btn' src=${closeBtn} />`: ""}
         <div class="modal__body-content">
         ${contentComponent.render()}
         </div>
           </div>                 
        </div>    
        `;
		};
	}

   setEvent() {
      const { toggleModal } = this.props;
		this.addEvent('click', '.modal__close-btn', () => {
         toggleModal();
		});

      this.addEvent('click', '.modal', () => {
         toggleModal();
      });
	}
}
