import Component from '../../core/component';
import { buttonTypes, searchLectureOptionTypes } from '../../helper/types';
import Button from '../button/button.component';
import SearchLectureBar from '../search-lecture-bar/search-lecture-bar.component';
import SearchLectureTableList from '../search-lecture-table-list/search-lecture-table-list.component';
import { createAction, store } from '../../store/store';
import { ERROR_ACTION_TYPES, ERROR_TYPES } from '../../store/types';
import { fetchGetSearchedLecture } from '../../async/lecture';
import { handleErrorObject, showErrorModal } from '../../helper/errorHandler';

export default class SearchLectureTable extends Component {
	initState() {
		this.state = {
			searchText: '',
			option: searchLectureOptionTypes.name,
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

	async fetchSearchedLecture() {
		// todo
		const { searchText, option } = this.state;

		if (option === searchLectureOptionTypes.name && this.validateSearchTextLength() === false) {
			store.dispatch(
				createAction(ERROR_ACTION_TYPES.SHOW_ERROR, {
					error: ERROR_TYPES.SEARCH_TEXT_LENGTH,
				})
			);
		}

		const formData = {
			keyword: searchText,
			qtype: searchLectureOptionTypes.code === option ? 'code' : 'name',
		};

		this.setState({
			isLoading: true,
		});

		try {
			const result = await fetchGetSearchedLecture(formData);
			this.setState({
				searchedLectures: result.searchedLectures,
			});
		} catch (error) {
			handleErrorObject(error);
		}
		this.setState({
			isLoading: false,
		});
	}

	validateSearchTextLength() {
		const { searchText } = this.state;
		if (searchText.length < 2) return false;
		return true;
	}

	template() {
		const toggleOptionButton = this.addChild(Button);
		const searchButton = this.addChild(Button);
		const searchLectureBar = this.addChild(SearchLectureBar);
		const searchLectureTableList = this.addChild(SearchLectureTableList);

		return (props) => {
			if (props) this.setProps(props);

			const { searchText, option, isLoading, searchedLectures } = this.state;
			const { addTakenLecture } = this.props;

			const searchLectureBarProps = {
				onChange: this.changeSearchText.bind(this),
				value: searchText,
				buttonKey: 'search-button',
			};

			const searchButtonProps = {
				content: '검색하기',
				type: buttonTypes.primary,
				size: 'xs',
				key: 'search-button',
				onClick: this.fetchSearchedLecture.bind(this),
			};

			const toggleOptionButtonProps = {
				content: `${option} »`,
				type: buttonTypes.grey,
				size: 'xs',
				key: 'option-button',
				onClick: this.toggleOption.bind(this),
			};

			const searchLectureTableListProps = {
				isLoading,
				searchedLectures,
				addTakenLecture,
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
