import Component from '../../core/component';

import GuideTutorial from '../../components/guide-tutorial/guide-tutorial.component';
import ImgExplain from '../img-explain/img-explain.component';
import modalHeader from '../modal-header/modal-header.component';
import sign from '../../../public/images/sign.png';

export default class GuideFuction extends Component {
	initState() {
		this.state = {
			isView: false,
		};
	}

	template() {
		const tutorial = this.addChild(GuideTutorial);
		const header = this.addChild(modalHeader);
		const imgExplain= this.addChild(ImgExplain);

		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="guide-fuction">
				  <div class="guide-fuction__header">				
						<div class="guide-fuction__header-text">	
							안녕하세요! <br/>
							여러분을 위한 졸업 요건 충족도 확인 서비스 ‘졸업을 부탁해’ 입니다. <br/>
							가이드를 통해 우리 서비스의 주요정보와 사용법을 확인해보세요😊 		
						</div>		
						<div class="guide-fuction__header-tutorial">
						${ this.state.isView 
							? `<div></div>`
							: `<div class="guide-fuction__header-tutorial-style">👉PDF 파일 업로드 방법</div>보기`}							
						</div>
				  </div>
				  ${header.render({ title: '주요 기능' })}	
				  <div class="guide-fuction__content">
						<div class="guide-fuction__content-item">${imgExplain.render({ img: sign, title: 'first', explain:'학과별 졸업시 충족되어야하는 전공 학점 및 과목 리스트를 알 수 있습니다.'})}</div>			
						<div class="guide-fuction__content-item">${imgExplain.render({ img: sign, title: 'second', explain:'교양 및 전공 카테고리별로 수강한 학점 현황을 알 수 있습니다.'})}	</div>		
						<div class="guide-fuction__content-item">${imgExplain.render({ img: sign, title: 'third', explain:'교양및 전공 카테고리별로 기이수/미이수한 과목 정보를 알 수 있습니다.'})}	</div>		
				  </div>
				  ${ this.state.isView ? tutorial.render() : `<div></div>`}
				</div>
			`;
		};
	}
	setEvent(){
		this.addEvent('click','.guide-fuction__header-tutorial-style', () => {
			this.setState({
				isView: !this.state.isView,
			});
		})
	  }
}
