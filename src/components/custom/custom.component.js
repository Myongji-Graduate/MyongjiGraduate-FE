import Component from '../../core/component';

import { buttonTypes } from '../../helper/types';
import Button from '../button/button.component';

export default class Custom extends Component {
	template() {
		const customButton = this.addChild(Button);
		return (props) => {
			if (props) this.setProps(props);

			const { onClick } = this.props;

			return `
       <div class="custom">       
            <div class="custom__button"> 
            ${customButton.render({
							content: '커스텀하기',
							type: buttonTypes.primary,
							size: 'md',
							key: 'customStart',
							onClick,
						})}   
            </div>    
       </div>
      `;
		};
	}
}
