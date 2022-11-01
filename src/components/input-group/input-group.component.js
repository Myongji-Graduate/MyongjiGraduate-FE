import Component from '../../core/component';

import { inputTypes } from '../../helper/types';

export default class InputGroup extends Component {
	setDefaultProps() {
		this.props = {
			name: '',
			placeholder: '',
			onChange: () => {},
			value: '',
			type: inputTypes.text,
			options: [],
			isValidation: false,
			validationCallback: () => {},
			errorMessage: '',
		};
	}


	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { name, type, errorMessage, key } = this.props; // isValidation

			return `
        <div class="input-group__${key} input-group--${name} input-group">
          <labal class="input-group__label" for=${name}>${name}</label>
          ${this.getInputByType(type)}
					<div class="input-group__error-message">
					${this.checkIsShowErrorMessage() ? errorMessage : ''}
					</div>
        </div>
      `;
		};
	}

	checkIsShowErrorMessage() {
		const { isValidation, value } = this.props;

		return value.length !== 0 && !isValidation;
	}

	getInputByType(type) {
		if (type === 'text') return this.getTextInput();

		if (type === 'select') return this.getSelect();

		return false;
	}

	getTextInput() {
		const { name, placeholder, value } = this.props;

		return `<input class="input-group__text" type="text" id=${name} value="${value}" placeholder="${placeholder}" >`;
	}

	getSelect() {
		const { name, placeholder, value, options } = this.props;

		return `
      <select class="input-group__select" name=${name} required>
        <option class="input-group__select-placeholder" value="" ${
					value === '' ? 'selected' : ''
				}>${placeholder}</option>
        ${options.map((option) => `<option ${value === option ? 'selected' : ''} value="${option}">${option}</option>`)}
      </select>
    `;
	}

	setEvent() {
		const { type, onChange, validationCallback } = this.props;

		this.addEvent('change', `.input-group__${type}`, (_, target) => {
			onChange(target.value);
		});
		this.addEvent('focusout', `.input-group__${type}`, (_, target) => {
			this.setState({ unuse: false });
			validationCallback(target.value);
		});
	}
}
