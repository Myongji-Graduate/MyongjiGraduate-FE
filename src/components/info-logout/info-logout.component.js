import Component from '../../core/component';

import { buttonTypes } from '../../helper/types';
import Button from '../button/button.component';
import MyInfo from '../my-info/my-info.component';
import { signOut, checkIsSignIn } from '../../helper/auth';

export default class InfoLogout extends Component {
	async logOut() {
		await signOut();
	}

	template() {
		const logoutButton = this.addChild(Button);
		const myInfo = this.addChild(MyInfo);
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
							onClick: this.logOut,
						})}   
            </div>
       </div>
      `;
		};
	}
}
