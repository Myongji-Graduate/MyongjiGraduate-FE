import Component from '../../core/component';

import GuideTutorial from '../guide-tutorial/guide-tutorial.component';
import ImgExplain from '../img-explain/img-explain.component';
import modalHeader from '../modal-header/modal-header.component';
import feature1 from '../../../public/images/feature1.png';
import feature2 from '../../../public/images/feature2.png';
import feature3 from '../../../public/images/feature3.png';

export default class GuideFuction extends Component {
	initState() {
		this.state = {
			isView: false,
		};
	}

	template() {
		const tutorial = this.addChild(GuideTutorial);
		const header = this.addChild(modalHeader);
		const imgExplain = this.addChild(ImgExplain);

		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="guide-fuction">
				  <div class="guide-fuction__header">	
				  		<div class="guide-fuction__header-title">튜토리얼</div>		
						<div class="guide-fuction__header-divider"></div>	
						<div class="guide-fuction__header-text">								
							여러분을 위한 졸업 요건 충족도 확인 서비스 ‘졸업을 부탁해’ 입니다. <br/>
							가이드를 통해 우리 서비스의 주요정보와 사용법을 확인해보세요😊 
						</div>		
						<div class="guide-fuction__header-tutorial">
						${
							this.state.isView
								? `<div></div>`
								: `<div class="guide-fuction__header-tutorial-style">👉PDF 파일 업로드 방법</div>보기`
						}							
						</div>
				  </div>
				  ${header.render({ title: '주요 기능' })}
				  <div class="guide-fuction__content">
						<div class="guide-fuction__content-item">${imgExplain.render({
							img: feature1,
							title: 'first',
							explain: '강의 커스텀을 통한 졸업 사정 예측',
						})}</div>			
						<div class="guide-fuction__content-item">${imgExplain.render({
							img: feature2,
							title: 'second',
							explain: '카테고리별(교양 / 전공) 수강 학점 현황 조회',
						})}	</div>		
						<div class="guide-fuction__content-item">${imgExplain.render({
							img: feature3,
							title: 'third',
							explain: '카테고리별(교양 / 전공 ) 미이수 과목 정보 및 잔여 학점 조회',
						})}	</div>		
				  </div>
				  ${this.state.isView ? tutorial.render() : `<div></div>`}
				</div>
			`;
		};
	}

	setEvent() {
		this.addEvent('click', '.guide-fuction__header-tutorial-style', () => {
			this.setState({
				isView: !this.state.isView,
			});
			document.querySelector('.guide-tutorial').scrollIntoView({ behavior: 'smooth' });
		});
	}
}
