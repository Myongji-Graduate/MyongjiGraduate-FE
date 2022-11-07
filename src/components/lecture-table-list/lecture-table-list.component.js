import Component from '../../core/component';
import { lectureTableItemTypes } from '../../helper/types';
import Loading from '../loading/loading.component';

export default class LectureTableList extends Component {
	setDefaultProps() {
		this.props = {
			lectures: [],
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

	getPlainTableList() {
		const { lectures } = this.props;

		return lectures.map((lecture) => {
			return `
            <div class="lecture-table-list__body">
            <div class="lecture-table-list__body__column">${lecture.code}</div>
            <div class="lecture-table-list__body__column">${lecture.name}</div>
            <div class="lecture-table-list__body__column">${lecture.credit}</div>
            </div>
            `;
		});
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
      <div class="lecture-table-list__body--${lecture.id} lecture-table-list__body lecture-table-list__body--${type}">
        <div class="lecture-table-list__body__column">${lecture.code}</div>
        <div class="lecture-table-list__body__column">${lecture.name}</div>
        <div class="lecture-table-list__body__column">${lecture.credit}</div>
        <div class="lecture-table-list__body__button lecture-table-list__body__button--${lecture.id}">삭제</div>
      </div>`;
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="lecture-table-list">
          ${this.getTableList()}
       </div>
      `;
		};
	}

	setEvent() {
		const { isEditableMode, deleteTakenLecture, addedTakenLecutures, deleteAddedTakenLecture } = this.props;
		if (isEditableMode) {
			this.getNotDeletedTakenLectureList().forEach((lecture) => {
				this.addEvent('click', `.lecture-table-list__body__button--${lecture.id}`, () => {
					deleteTakenLecture(lecture);
				});
			});

			addedTakenLecutures.forEach((lecture) => {
				this.addEvent('click', `.lecture-table-list__body__button--${lecture.id}`, () => {
					deleteAddedTakenLecture(lecture);
				});
			});
		}
	}
}
