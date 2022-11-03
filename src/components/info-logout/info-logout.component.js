import Component from '../../core/component';

import { buttonTypes } from '../../helper/types';
import Button from '../button/button.component';
import MyInfo from '../my-info/my-info.component';

export default class InfoLogout extends Component {
	template() {
		return (props) => {
			const logoutButton = this.addChild(Button);
			const myInfo = this.addChild(MyInfo);
			if (props) this.setProps(props);

			return `
       <div class="info-logout">       
            <div class="info-logout__info"> 
            ${myInfo.render()} 
            </div>                 
            <div class="info-logout__logout">
            ${logoutButton.render({
							content: '로그아웃',
							type: buttonTypes.grey,
							size: 'sm',
							key: 'logout',
						})}   
            </div>
       </div>
      `;
		};
	}
}
