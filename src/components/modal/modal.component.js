import Component from '../../core/component';

import closeBtn from '../../../public/icons/close_btn.svg';

export default class modal extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="modal">
           <div class="modal__body">
          dfsd
           <img class="modal__btn" src=${closeBtn} />      
           </div>                 
        </div>    
        `;
		};
	}
	// button click시 modal display none처리
}
