import Component from '../../core/component';

export default class TutorialPage extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="tutorial-page">
					튜토리얼 페이지
				</div>
			`;
		};
	}
}
