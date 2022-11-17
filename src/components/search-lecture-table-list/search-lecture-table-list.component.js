import Component from '../../core/component';
import * as utils from '../../helper/utils';

import Loading from '../loading/loading.component';
import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 112,
	tablet: 112,
	sm: 112,
	md: 144,
	lg: 192,
};

const [sizesAttr, srcsetAttr] = getResponseiveImage( sizes, `${IMAGE_URL}/images/lecture-icon.svg`);

export default class SearchLectureTableList extends Component {
	setDefaultProps() {
		this.props = {
			isLoading: false,
			searchedLectures: [],
			addTakenLecture: () => {},
		};
	}

	getTableList() {
		const { searchedLectures } = this.props;

		if (searchedLectures.length === 0) return this.getDefaultContent();
		return this.getEditableList(searchedLectures).join('');
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

		const Style = { color : lecture.revoke ? 'red' : 'black' };

		return `
		<div class="search-lecture-table-list__tr--${lecture.id} search-lecture-table-list__tr" style=${utils.getInlineStyle(Style)}>
			<div class="search-lecture-table-list__tr__column">${lecture.lectureCode}</div>
			<div class="search-lecture-table-list__tr__column">${lecture.name}</div>
			<div class="search-lecture-table-list__tr__column">${lecture.credit}</div>
			<div class="search-lecture-table-list__tr__button--${lecture.id} search-lecture-table-list__tr__button">추가</div>
     	</div>`;
	}

	getDefaultContent() {
		return `<div class="search-lecture-table-list__background-container">
    <img sizes="${sizesAttr}" srcset="${srcsetAttr}" class="search-lecture-table-list__background-icon" alt="search-lecture-table-list__background-icon" />
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

	setEvent() {
		const { searchedLectures, addTakenLecture } = this.props;

		searchedLectures.forEach((lecture) => {
			this.addEvent('click', `.search-lecture-table-list__tr__button--${lecture.id}`, () => {
				addTakenLecture(lecture);
			});
		});
	}
}
