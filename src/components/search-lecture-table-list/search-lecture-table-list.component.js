import Component from '../../core/component';

import lectureIcon from '../../../public/icons/lecture-icon.svg';
import Loading from '../loading/loading.component';

export default class SearchLectureTableList extends Component {
	setDefaultProps() {
		this.props = {
			isLoading: false,
			searchedLectures: [],
		};
	}

	getTableList() {
		const { searchedLectures } = this.props;

		if (searchedLectures.length === 0) return this.getDefaultContent();
		return this.getEditableList(searchedLectures);
	}

	getLoadingContent(loadingComponent) {
		return `
    <div class="search-lecture-table-list__loading-container">
      ${loadingComponent.render()}
    </div>
    `;
	}

	getEditableList(lectures) {
		return lectures.map((lecture) => this.getEditableTableItemTemplate(lecture));
	}

	getEditableTableItemTemplate(lecture) {
		return `
      <div class="search-lecture-table-list__tr--${lecture.id} search-lecture-table-list__tr">
        <div class="search-lecture-table-list__tr__column">${lecture.code}</div>
        <div class="search-lecture-table-list__tr__column">${lecture.name}</div>
        <div class="search-lecture-table-list__tr__column">${lecture.credit}</div>
        <div class="search-lecture-table-list__tr__button--${lecture.id} search-lecture-table-list__button">추가</div>
      </div>`;
	}

	getDefaultContent() {
		return `<div class="search-lecture-table-list__background-container">
    <img src=${lectureIcon} class="search-lecture-table-list__background-icon" />
    <div class="search-lecture-table-list__background-text">검색 결과가 표시됩니다</div>
  </div>`;
	}

	template() {
		const loading = this.addChild(Loading);
		return (props) => {
			if (props) this.setProps(props);

			const { isLoading } = this.props;

			return `
       <div class="search-lecture-table-list">
          ${isLoading ? this.getLoadingContent(loading) : this.getTableList()}
       </div>
      `;
		};
	}
}
