import Component from '../../core/component';
import profileImg from '../../../public/images/profile-image.png';

export default class MyInfo extends Component {
	template() {
		return (props) => {
			// const { basicUserInfo } = store.getState();

			if (props) this.setProps(props);

			return `
       <div class="my-info">       
            <img src=${profileImg} class="my-info-img"/>
            <div class="my-info-text">
                <div class="my-info-text__name">
                <div class="my-info-text__name-data">양성훈</div>
                <div class="my-info-text__name-suffix">님</div>
                </div>
                <div class="my-info-text__major">융합소프트웨어학부</div>
                <div class="my-info-text__studentId">60201671</div>
            </div>
       </div>
      `;
		};
	}
}
