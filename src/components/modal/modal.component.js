import Component from '../../core/component';

import closeBtn from '../../../public/icons/close_btn.svg';

export default class modal extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

         const { isModalShow } = this.props;

			return `
        <div class="modal" style="display:${isModalShow ? 'block' : 'none'}" >
           <div class="modal__body">
          dfsd
           <img class="modal__close-btn" src=${closeBtn} />      
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
	}
}
