import Component from '../../core/component';
import { lectureTableItemTypes } from '../../helper/types';

export default class ResultLectureTableList extends Component {
	setDefaultProps() {
		this.props = {
			part: '',
			lectures: [],
			takenLectures: [],
			completionList: false,
			isEditableMode: false,
			addedTakenLecutures: [],
			deletedTakenLecutures: [],
			deleteTakenLecture: () => {},
			deleteAddedTakenLecture: () => {},
		};
	}

	getTableList() {
		const { isEditableMode } = this.props;

		if (isEditableMode === false) {
			return this.getPlainTableList();
		}
		return this.getEditableTableList();
	}

	getLectures() {
		const { lectures, takenLectures, completionList } = this.props;
		if (completionList) {
			return takenLectures;
		}
		return lectures;
	}

	getPlainTableList() {
		return this.getLectures()
			.map((lecture) => {
				return `
            <div class="result-lecture-table-list__body">
            <div class="result-lecture-table-list__body__column">${lecture.code}</div>
            <div class="result-lecture-table-list__body__column">${lecture.name}</div>
            <div class="result-lecture-table-list__body__column">${lecture.credit}</div>
            </div>
            `;
			})
			.join('');
	}

	getEditableTableList() {
		return `
			${this.getAddedTakenLectureList().join('')}
			${this.getTakenLecutureList().join('')}
		`;
	}

	getAddedTakenLectureList() {
		const { addedTakenLecutures } = this.props;
		return addedTakenLecutures.map((addedTakenLecuture) => {
			return this.getEditableTableItemTemplate(addedTakenLecuture, lectureTableItemTypes.addedLecture);
		});
	}

	getTakenLecutureList() {
		return this.getNotDeletedTakenLectureList().map((takenLecture) =>
			this.getEditableTableItemTemplate(takenLecture, lectureTableItemTypes.takenLecture)
		);
	}

	getNotDeletedTakenLectureList() {
		const { lectures } = this.props;
		return lectures.filter((lecture) => {
			return !this.isDeletedTakenLecture(lecture);
		});
	}

	isDeletedTakenLecture(lecture) {
		const { deletedTakenLecutures } = this.props;
		const filtedLectures = deletedTakenLecutures.filter((deletedTakenLecuture) => {
			return deletedTakenLecuture.id === lecture.id;
		});
		return filtedLectures.length > 0;
	}

	getEditableTableItemTemplate(lecture, type) {
		return `
      <div class="result-lecture-table-list__body--${lecture.id} lecture-table-list__body lecture-table-list__body--${type}">
        <div class="result-lecture-table-list__body__column">${lecture.code}</div>
        <div class="result-lecture-table-list__body__column">${lecture.name}</div>
        <div class="result-lecture-table-list__body__column">${lecture.credit}</div>
        <div class="result-lecture-table-list__body__button result-lecture-table-list__body__button--${lecture.id}">삭제</div>
      </div>`;
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);
			return `
        <div class="result-lecture-table-list">
          ${this.getTableList()}
       </div>
      `;
		};
	}

	setEvent() {
		const { isEditableMode, deleteTakenLecture, addedTakenLecutures, deleteAddedTakenLecture } = this.props;
		if (isEditableMode) {
			this.getNotDeletedTakenLectureList().forEach((lecture) => {
				this.addEvent('click', `.result-lecture-table-list__body__button--${lecture.id}`, () => {
					deleteTakenLecture(lecture);
				});
			});

			addedTakenLecutures.forEach((lecture) => {
				this.addEvent('click', `.result-lecture-table-list__body__button--${lecture.id}`, () => {
					deleteAddedTakenLecture(lecture);
				});
			});
		}
	}
}
