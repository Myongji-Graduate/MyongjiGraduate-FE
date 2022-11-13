import Component from '../../core/component';

import { buttonTypes } from '../../helper/types';
import Button from '../button/button.component';
import MyInfo from '../my-info/my-info.component';
import GNB from '../GNB/GNB.component';

export default class InfoLogout extends Component {
	template() {
		const logoutButton = this.addChild(Button);
		const myInfo = this.addChild(MyInfo);
		const gnb = this.addChild(GNB);
		return (props) => {
			if (props) this.setProps(props);

			return `
       <div class="info-logout">       
            <div class="info-logout__info"> 
            ${myInfo.render({
							key: 'profile',
						})} 
            </div>                 
            <div class="info-logout__logout">
            ${logoutButton.render({
							content: '로그아웃',
							type: buttonTypes.grey,
							size: 'sm',
							key: 'logout',
							onClick: gnb.logOut.bind(this),
						})}   
            </div>
       </div>
      `;
		};
	}
}
