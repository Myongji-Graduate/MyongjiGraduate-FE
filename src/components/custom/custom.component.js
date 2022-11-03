import Component from '../../core/component';

import { buttonTypes } from '../../helper/types';
import Button from '../button/button.component';


export default class Custom extends Component {
	template() {
		return (props) => {
			const customButton = this.addChild(Button);
			
			if (props) this.setProps(props);

			return `
       <div class="custom">       
            <div class="custom__button"> 
            ${customButton.render({
				content: '커스텀하기',
				type: buttonTypes.primary,
				size: 'md',
				key: 'customStart',
			})}   
            </div>    
       </div>
      `;
		};
	}
}
