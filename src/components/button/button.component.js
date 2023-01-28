import * as utils from '../../helper/utils';
import Component from '../../core/component';

import { buttonTypes } from '../../helper/types';

export default class Button extends Component {
	setDefaultProps() {
		this.props = {
			content: 'innertext',
			onClick: () => {},
			type: buttonTypes.normal,
			size: 'lg',
			disabled: false,
			styleOption: {},
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { content, type, size, key, disabled, styleOption } = this.props;
			return `
        <button ${disabled && 'disabled'} class="${key ? `button__${key} ` : ''}button--${type} button--${size} button" 
			style=${utils.getInlineStyle(styleOption)}> 
		${content} 
		</button>
      `;
		};
	}

	setEvent() {
		const { onClick } = this.props;
		this.addEvent('click', '.button', () => {
			onClick();
		});
	}
}
