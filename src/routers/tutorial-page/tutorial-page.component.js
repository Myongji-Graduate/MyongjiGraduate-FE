import Component from '../../core/component';

import Mypage from '../../components/mypage/mypage.component';

export default class TutorialPage extends Component {
	template() {
		const mypage = this.addChild(Mypage);

		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="tutorial-page">
				${mypage.render()}				
				</div>
			`;
		};
	}
}
