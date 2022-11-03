import Component from '../../core/component';

import Header from '../../components/header/header.component';
import InfoLogout from '../../components/info-logout/info-logout.component';
import TakenLectureList from '../../components/taken-lecture-list/taken-lecture-list.component';
import TakenLecture from '../../components/taken-lecture/taken-lecture.component';

export default class MypagePage extends Component {
	template() {
		const header = this.addChild(Header);
		const infoLogout = this.addChild(InfoLogout);
		const takenLectureList = this.addChild(TakenLectureList);
    const takenLecture = this.addChild(TakenLecture);
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

                <div class="mypage-page__lecture-container">
                 <div class="mypage-page__taken-lecture-container">
                   ${takenLecture.render()}
                 </div>
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
