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
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { content, type, size, key, disabled } = this.props;
			return `
        <button ${disabled && 'disabled'} class="${
				key ? `button__${key} ` : ''
			}button--${type} button--${size} button" > 
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
