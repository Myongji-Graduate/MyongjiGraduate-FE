import Component from '../../core/component';

import TakenLectureList from '../taken-lecture-list/taken-lecture-list.component';
import TakenLecture from '../taken-lecture/taken-lecture.component';
import { createAction, store } from '../../store/store';
import { ERROR_ACTION_TYPES, ERROR_TYPES } from '../../store/types';
import { fetchGetTakenLectures, fetchUpdateTakenLecture } from '../../async/lecture';

import { handleErrorObject } from '../../helper/errorHandler';

export default class MypageBody extends Component {
	initState() {
		this.state = {
			takenLectures: [],
			addedTakenLecutures: [],
			deletedTakenLecutures: [],
			isEditableMode: false,
			isLoading: false,
			whiteList: ['KMA02101'],
			totalCredit: 0,
		};
	}

	async fetchTakenLecture() {
		this.setState({
			isLoading: true,
		});

		try {
			const result = await fetchGetTakenLectures();
			this.setState({
				takenLectures: result.takenLectures,
				totalCredit: result.totalCredit,
				isLoading: false,
			});
		} catch (error) {
			handleErrorObject(error);
			this.setState({
				isLoading: false,
			});
		}
	}

	componentDidMount() {
		this.fetchTakenLecture();
	}

	toggleEditableMode() {
		this.setState({
			isEditableMode: !this.state.isEditableMode,
		});
	}

	clearEditedLecture() {
		this.setState({
			isEditableMode: false,
			addedTakenLecutures: [],
			deletedTakenLecutures: [],
		});
	}

	async submitEditedLecture() {
		const { deletedTakenLecutures, addedTakenLecutures } = this.state;
		const formData = {};
		formData.deletedTakenLectures = deletedTakenLecutures.map((deletedTakenLecuture) => deletedTakenLecuture.id);
		formData.addedTakenLectures = addedTakenLecutures.map((addedTakenLecuture) => addedTakenLecuture.id);
		try {
			await fetchUpdateTakenLecture(formData);
			this.clearEditedLecture();
			this.fetchTakenLecture();
		} catch (error) {
			handleErrorObject(error);
		}
		// this.clearEditedLecture();
	}

	deleteTakenLecture(lecture) {
		this.setState({
			deletedTakenLecutures: [...this.state.deletedTakenLecutures, lecture],
		});
	}

	countChaple() {
		const { addedTakenLecutures, takenLectures } = this.state;
		const Chaple = {
			code: 'KMA02101',
		};
		return this.countLecture(addedTakenLecutures, Chaple) + this.countLecture(takenLectures, Chaple);
	}

	addTakenLecture(lecture) {
		const { addedTakenLecutures, takenLectures, whiteList } = this.state;

		const newLecture = this.formatLecture(lecture);

		if (whiteList.includes(newLecture.code)) {
			this.setState({
				addedTakenLecutures: [...this.state.addedTakenLecutures, newLecture],
			});
			return;
		}

		if (this.containLecture(addedTakenLecutures, newLecture)) {
			store.dispatch(
				createAction(ERROR_ACTION_TYPES.SHOW_ERROR, {
					error: ERROR_TYPES.ALREADY_ADD_LECTURE,
				})
			);
			return;
		}

		if (this.containLecture(takenLectures, newLecture)) {
			store.dispatch(
				createAction(ERROR_ACTION_TYPES.SHOW_ERROR, {
					error: ERROR_TYPES.ALREADY_ADD_TAKEN,
				})
			);
			return;
		}

		this.setState({
			addedTakenLecutures: [...this.state.addedTakenLecutures, newLecture],
		});
	}

	formatLecture(searchedLecture) {
		return {
			id: searchedLecture.id,
			year: '커스텀',
			semester: '커스텀',
			code: searchedLecture.lectureCode,
			name: searchedLecture.name,
			credit: searchedLecture.credit,
		};
	}

	containLecture(lectures, lecture) {
		return this.countLecture(lectures, lecture) > 0;
	}

	countLecture(lectures, lecture) {
		return lectures.filter((lec) => {
			return lec.code === lecture.code;
		}).length;
	}

	deleteAddedTakenLecture(lecture) {
		const newAddedTakenLecutures = this.state.addedTakenLecutures.filter(
			(addedTakenLecuture) => addedTakenLecuture.code !== lecture.code
		);
		this.setState({
			addedTakenLecutures: newAddedTakenLecutures,
		});
	}

	template() {
		const takenLectureList = this.addChild(TakenLectureList);
		const takenLecture = this.addChild(TakenLecture);
		return (props) => {
			if (props) this.setProps(props);

			const { totalCredit, takenLectures, isEditableMode, addedTakenLecutures, deletedTakenLecutures, isLoading } =
				this.state;

			const tableLectureListProps = {
				takenLectures,
				isEditableMode,
				addedTakenLecutures,
				deletedTakenLecutures,
				isLoading,
				deleteTakenLecture: this.deleteTakenLecture.bind(this),
				deleteAddedTakenLecture: this.deleteAddedTakenLecture.bind(this),
				clearEditedLecture: this.clearEditedLecture.bind(this),
				toggleEditableMode: this.toggleEditableMode.bind(this),
				submitEditedLecture: this.submitEditedLecture.bind(this),
				addTakenLecture: this.addTakenLecture.bind(this),
			};

			return `
      <div class="mypage-body__lecture-container">
        <div class="mypage-body__taken-lecture-container">
          ${takenLecture.render({
						totalCredit,
					})}
        </div>
        <div class="mypage-body__taken-lecture-list-container">
          ${takenLectureList.render(tableLectureListProps)}
      </div>
    </div>
      `;
		};
	}
}
