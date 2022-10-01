import Component from '../../core/component';
import { store } from '../../store/store';

export default class MainBtn extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);
			return `
        <button class="button"> 검사시작 </button>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', '.button', () => {
			const { router } = store.getState();
			router.navigate('/product');
		});
	}
}
