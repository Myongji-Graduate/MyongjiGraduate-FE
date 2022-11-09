import Component from '../../core/component';

import searchIcon from '../../../public/icons/search-icon.svg';

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
          <img class="search-lecture-bar__search-icon" src=${searchIcon} alt="search-lecture-bar__search-icon" />
          <input placeholder="검색어를 입력해주세요" type="text" class="search-lecture-bar__input" />   
       </div>
      `;
		};
	}

	setEvent() {
		const { onChange, buttonKey } = this.props;

		this.addEvent('change', `.search-lecture-bar__input`, (_, target) => {
			onChange(target.value);
		});

		if (buttonKey) {
			this.addEvent('keyup', `.search-lecture-bar__input`, (event, target) => {
				if (event.keyCode === 13) {
					event.preventDefault();
					document.querySelector(`.button__${buttonKey}`).click();
				}
			});
		}
	}
}
