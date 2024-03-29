import Component from '../../core/component';
import * as utils from '../../helper/utils';

import { inputTypes } from '../../helper/types';

export default class InputGroup extends Component {
	setDefaultProps() {
		this.props = {
			name: '',
			id: '',
			placeholder: '',
			onChange: () => {},
			value: '',
			type: inputTypes.text,
			options: [],
			isValidation: false,
			validationCallback: () => {},
			errorMessage: '',
			buttonKey: undefined,
			styleOption: {},
			readonly: false,
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { name, type, errorMessage, key } = this.props; // isValidation

			return `
        <div class="input-group__${key} input-group--${name} input-group">
          ${name && `<labal class="input-group__label" for=${name}>${name}</label>`}
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
		if (type === inputTypes.text) return this.getTextInput();

		if (type === inputTypes.select) return this.getSelect();

		if (type === inputTypes.password) return this.getPassword();

		return false;
	}

	getPassword() {
		const { placeholder, value, id, key } = this.props;
		return `<input class="input-group__password__${key} input-group__password" type="password" id=${id} value="${value}" placeholder="${placeholder}" >`;
	}

	getTextInput() {
		const { name, placeholder, value, key, readonly } = this.props;

		return `<input class="input-group__text__${key} input-group__text" type="text" id=${name} value="${value}" placeholder="${placeholder}" ${
			readonly && 'readonly'
		} >`;
	}

	getSelect() {
		const { name, placeholder, value, options, key, styleOption } = this.props;

		return `
      <select class="input-group__select__${key} input-group__select" name=${name} required style=${utils.getInlineStyle(
			styleOption
		)}>
        <option class="input-group__select-placeholder" value="" ${
					value === '' ? 'selected' : ''
				}>${placeholder}</option>
        ${options.map((option) => `<option ${value === option ? 'selected' : ''} value="${option}">${option}</option>`)}
      </select>
    `;
	}

	setEvent() {
		const { key, type, onChange, validationCallback, buttonKey } = this.props;

		this.addEvent('change', `.input-group__${type}__${key}`, (_, target) => {
			onChange(target.value);
		});
		this.addEvent('focusout', `.input-group__${type}__${key}`, (_, target) => {
			validationCallback(target.value);
		});

		if (buttonKey) {
			this.addEvent('keypress', `.input-group__${type}__${key}`, (event, target) => {
				if (event.keyCode === 13) {
					event.preventDefault();
					document.querySelector(`.input-group__${type}__${key}`).blur();
					document.querySelector(`.button__${buttonKey}`).click();
				}
			});
		}
	}
}
