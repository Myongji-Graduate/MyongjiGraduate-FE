import Component from '../../core/component';
import { buttonTypes, searchLectureOptionTypes } from '../../helper/types';
import Button from '../button/button.component';
import SearchLectureBar from '../search-lecture-bar/search-lecture-bar.component';
import SearchLectureTableList from '../search-lecture-table-list/search-lecture-table-list.component';

export default class SearchLectureTable extends Component {
	initState() {
		this.state = {
			searchText: '',
			option: searchLectureOptionTypes.code,
			searchedLectures: [],
			isLoading: false,
		};
	}

	setDefaultProps() {
		this.props = {
			addTakenLecture: () => {},
		};
	}

	toggleOption() {
		this.setState({
			option:
				this.state.option === searchLectureOptionTypes.code
					? searchLectureOptionTypes.name
					: searchLectureOptionTypes.code,
		});
	}

	changeSearchText(newValue) {
		this.setState({
			searchText: newValue,
		});
	}

	fetchSearchedLecture() {
		// todo
	}

	template() {
		const toggleOptionButton = this.addChild(Button);
		const searchButton = this.addChild(Button);
		const searchLectureBar = this.addChild(SearchLectureBar);
		const searchLectureTableList = this.addChild(SearchLectureTableList);

		return (props) => {
			if (props) this.setProps(props);

			const { searchText, option, isLoading, searchedLectures } = this.state;

			const searchLectureBarProps = {
				onChange: this.changeSearchText.bind(this),
				value: searchText,
			};

			const searchButtonProps = {
				content: '검색하기',
				type: buttonTypes.primary,
				size: 'xs',
				key: 'search-button',
				onClick: this.fetchSearchedLecture.bind(this),
			};

			const toggleOptionButtonProps = {
				content: option,
				type: buttonTypes.grey,
				size: 'xs',
				key: 'option-button',
				onClick: this.toggleOption.bind(this),
			};

			const searchLectureTableListProps = {
				isLoading,
				searchedLectures,
			};

			return `
       <div class="search-lecture-table">
        <div class="search-lecture-table__header">
          ${searchLectureBar.render(searchLectureBarProps)}
          <div class="search-lecture-table__header-button-container">
            ${searchButton.render(searchButtonProps)}
            <div class="search-lecture-table__spacer"></div>
            ${toggleOptionButton.render(toggleOptionButtonProps)}
          </div> 
        </div>
        <div class="search-lecture-table__spacer"></div>
        <div class="search-lecture-table__body">
          ${searchLectureTableList.render(searchLectureTableListProps)}
        </div>
       </div>
      `;
		};
	}
}
