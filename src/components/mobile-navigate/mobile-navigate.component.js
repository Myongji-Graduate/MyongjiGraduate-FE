import Component from '../../core/component';
import { store } from '../../store/store';

import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 44,
	tablet: 56,
	sm: 56,
	md: 72,
	lg: 96,
};
const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/mobile-navigate.png`);

export default class MobileNavigate extends Component {
	setDefaultProps() {
		this.props = {
			title: '',
			navigate: '',
			type: 'route',
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { title, navigate } = this.props;

			return `
            <div class="mobile-navigate__${title} mobile-navigate" key=${navigate}>
                <img sizes="${sizeAttr}" srcset="${srcsetAttr}" class="mobile-navigate__img" alt="mobile-navigate__img" />
                <div class="mobile-navigate__name">${title}</div>
                <div class="mobile-navigate__arrow">></div>
            </div>
        `;
		};
	}

	setEvent() {
		const { title, navigate, type } = this.props;
		if (type === 'route') {
			this.addEvent('click', `.mobile-navigate__${title}`, () => {
				const { router } = store.getState();
				router.navigate(`/${navigate}`);
			});
		}

		if (type === 'href') {
			this.addEvent('click', `.mobile-navigate__${title}`, () => {
				window.location.href = navigate;
			});
		}
	}
}
