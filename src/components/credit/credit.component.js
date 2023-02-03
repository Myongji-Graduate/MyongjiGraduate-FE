import * as utils from '../../helper/utils';
import Component from '../../core/component';

export default class Credit extends Component {
	setDefaultProps() {
		this.props = {
			title: '전공필수',
			value: '21',
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);
			const styleOption = {
				background: '#7590FF',
				width: '9rem',
				color: 'white',
			};
			const { title, value } = this.props;

			return `
        <div class= credit
		style=${title === '총 학점' ? utils.getInlineStyle(styleOption) : null}
		>      
            <div class="credit-title">${title}</div>
            <div class="credit-value">${value}</div>
        </div>`;
		};
	}
}
