import Component from '../../core/component';
import { checkIsSignIn } from '../../helper/auth';
import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 80,
	tablet: 100,
	sm: 100,
	md: 130,
	lg: 172,
};
const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes,`${IMAGE_URL}/images/profile-image.png`);

export default class MyInfo extends Component {
	template() {
		return (props) => {
			// const { basicUserInfo } = store.getState();

			if (props) this.setProps(props);

			return `
       <div class="my-info">       
            <img sizes="${sizeAttr}" srcset="${srcsetAttr}" class="my-info-img" alt="my-info-img" />
            <div class="my-info-text">
            <div class="my-info-text__name">
            ${
							checkIsSignIn()
								? // 파일업로드 확인 절차 한 번 더 거치기
								  `   
                <div class="my-info-text__name-data">양성훈</div>
                <div class="my-info-text__name-suffix">님</div>
                </div>
                <div class="my-info-text__major">융합소프트웨어학부</div>
                <div class="my-info-text__studentId">60201671</div>
                `
								: `
                <div class="my-info-text__name-data">GUEST</div>
                <div class="my-info-text__name-suffix"></div>
                </div>
                <div class="my-info-text__major">로그인이 필요합니다.</div>
                <div class="my-info-text__studentId"></div>               
                `
						}
            </div>
       </div>
      `;
		};
	}
}
