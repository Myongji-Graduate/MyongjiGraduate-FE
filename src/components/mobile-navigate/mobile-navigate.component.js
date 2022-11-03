import Component from '../../core/component';
import { store } from '../../store/store';

import mobileNavigateImg from '../../../public/images/mobile-navigate.png';
export default class MobileNavigate extends Component {
    setDefaultProps() {
		this.props = {
            title:'',
            navigate:'',
		};
	}
	template() {
		return (props) => {
			if (props) this.setProps(props);
		
            const { title } =  this.props;


			return `
            <div class="mobile-navigate">
                <img src=${mobileNavigateImg} class="mobile-navigate__img"/>
                <div class="mobile-navigate__name">${title}</div>
                <div class="mobile-navigate__arrow">></div>
            </div>
        `;
		};
	}

	setEvent() {
        const { navigate } = this.props;
		this.addEvent('click', '.mobile-navigate', () => {
			const { router } = store.getState();
			router.navigate(`/${navigate}`);
		});
	}
}
