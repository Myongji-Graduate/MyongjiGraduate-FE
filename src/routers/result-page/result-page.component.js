import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';
import Modal from '../../components/modal/modal.component';
//import ModalHackmunguicho from '../../components/modal-hackmunguicho/modal-hackmunguicho.component';
import ModalHackgyo from '../../components/modal-hackgyo/modal-hackgyo.component';

export default class ResultPage extends Component {
	initState() {
		this.state = {
			isModalShow: true,
		};
	}

	toggleModal() {
		this.setState({
			// isModalShow: !this.state.isModalShow,
		});
	}

	template() {
		const gnb = this.addChild(GNB);
		const modal = this.addChild(Modal);
		const hackgyo = this.addChild(ModalHackgyo);
		return (props) => {
			if (props) this.setProps(props);	

			return `
				<div class="result-page">
				${modal.render({
					isModalShow: this.state.isModalShow,
					toggleModal: this.toggleModal.bind(this),
					contentComponent: hackgyo,
					width: 1480,
					padding: 90,
				})}
					<div class="result-page__gnb-container">
					${gnb.render()}
					</div>
					</div>
					`;
		};
	}
}
