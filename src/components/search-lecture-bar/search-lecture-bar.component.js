import Component from '../../core/component';

import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 15,
	tablet: 20,
	sm: 20,
	md: 25,
	lg: 32,
};

const [sizesAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/search-icon.svg`);

export default class SearchLectureBar extends Component {
	setDefaultProps() {
		this.props = {
			value: '',
			onChange: () => {},
			buttonKey: undefined,
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
       <div class="search-lecture-bar">
          <img class="search-lecture-bar__search-icon" sizes="${sizesAttr}" srcset="${srcsetAttr}" alt="search-lecture-bar__search-icon" />
          <input placeholder="검색어를 입력해주세요" type="text" class="search-lecture-bar__input" />   
       </div>
      `;
		};
	}

	setEvent() {
		const { onChange, buttonKey } = this.props;

		this.addEvent('input', `.search-lecture-bar__input`, (_, target) => {
			onChange(target.value);
		});

		if (buttonKey) {
			this.addEvent('keypress', `.search-lecture-bar__input`, (event, target) => {
				if (event.keyCode === 13 && event.isComposing === false) {
					event.preventDefault();
					document.querySelector(`.button__${buttonKey}`).click();
				}
			});
		}
	}
}
