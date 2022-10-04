import Component from '../core/component';
import ModalLoading from '../../components/modal-result-content/modal-result-content.component';

export default class TestPage extends Component {
	template() {


		return (props) => {
			if (props) this.setProps(props);
            const modalLoading = this.addChild(ModalLoading);
			return `
        <div class="test-page">
        ${modalLoading.render}
        </div>
      `;
		};
	}
}
