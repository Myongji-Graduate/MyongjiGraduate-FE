import Component from '../../core/component';

import searchIcon from '../../../public/icons/search-icon.svg';

export default class SearchLectureBar extends Component {
	setDefaultProps() {
		this.props = {
			value: '',
			onChange: () => {},
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
       <div class="search-lecture-bar">
          <img class="search-lecture-bar__search-icon" src=${searchIcon} />
          <input placeholder="검색어를 입력해주세요" type="text" class="search-lecture-bar__input" />   
       </div>
      `;
		};
	}

	setEvent() {
		const { onChange } = this.props;

		this.addEvent('change', `.search-lecture-bar__input`, (_, target) => {
			onChange(target.value);
		});
	}
}
