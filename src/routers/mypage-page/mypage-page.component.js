import Component from '../../core/component';

import Header from '../../components/header/header.component';
import MyInfo from '../../components/my-info/my-info.component';
import TakenLectureList from '../../components/taken-lecture-list/taken-lecture-list.component';
import Button from '../../components/button/button.component';

import { buttonTypes } from '../../helper/types';

export default class MypagePage extends Component {
	template() {
		const header = this.addChild(Header);
		const myInfo = this.addChild(MyInfo);
		const takenLectureList = this.addChild(TakenLectureList);
		const logoutButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="mypage-page">
          <div class="mypage-page__header">
            ${header.render()}
          </div>
          <div class="mypage-page__body">
            <div class="mypage-page__content">
                <div class="mypage-page__info-container"> 
                  <div class="mypage-page__info-content"> ${myInfo.render()} </div>                 
                  <div class="mypage-page__info-logout">
                  ${logoutButton.render({
										content: '로그아웃',
										type: buttonTypes.grey,
										size: 'sm',
										key: 'logout',
									})}                 
                </div>
              </div>
              <div class="mypage-page__divider"></div>
              <div class="mypage-page__lecture-container">
                <div class="mypage-page__taken-lecture-container"></div>
                  <div class="mypage-page__taken-lecture-list-container">
                    ${takenLectureList.render()}
                  </div>
              </div>
            </div>
          </div>
        </div>
      `;
		};
	}
}
