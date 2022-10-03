import Component from '../../core/component';
import { store } from '../../store/store';

import * as utils from '../../helper/utils';

export default class MainBtn extends Component {
	setDefaultProps() {
		this.props = {
			width: 539,
			height: 104,
			content: 'innertext',
			direct: '',
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { width, height, content, direct } = this.props;

			const modalBodyStyle = {
				width: `${utils.convertPXToREM(width)}rem`,
				height: `${utils.convertPXToREM(height)}rem`,
			};

			return `
        <button class="button" style=${utils.getInlineStyle(modalBodyStyle)}> 
		${content} 
		</button>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', '.button', () => {
			if (this.props.direct !== '') {
				const { router } = store.getState();
				router.navigate(this.props.direct);
			}
		});
	}
}
