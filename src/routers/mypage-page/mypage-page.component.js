import Component from '../../core/component';

import Header from '../../components/header/header.component';
import InfoLogout from '../../components/info-logout/info-logout.component';
import MypageBody from '../../components/mypage-body/mypage-body.component';

export default class MypagePage extends Component {
	template() {
		const header = this.addChild(Header);
		const infoLogout = this.addChild(InfoLogout);
		const body = this.addChild(MypageBody);
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
                  ${infoLogout.render()}  
                </div>
                <div class="mypage-page__divider"></div>
               ${body.render()}
            </div>
          </div>
        </div>
      `;
		};
	}
}
