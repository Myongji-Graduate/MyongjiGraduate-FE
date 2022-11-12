import Component from '../../core/component';

import TakenLectureList from '../taken-lecture-list/taken-lecture-list.component';
import TakenLecture from '../taken-lecture/taken-lecture.component';
import { createAction, store } from '../../store/store';
import { ERROR_ACTION_TYPES, ERROR_TYPES } from '../../store/types';

export default class MypageBody extends Component {
	initState() {
		this.state = {
			takenLectures: [],
			addedTakenLecutures: [],
			deletedTakenLecutures: [],
			isEditableMode: false,
			isLoading: false,
		};
	}

	fetchTakenLecture() {
		this.setState({
			isLoading: true,
		});
		if (typeof window !== 'undefined') {
			fetch('/api/takenLectures')
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					this.setState({
						takenLectures: result.takenLectures,
						isLoading: false,
					});
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
			addedTakenLecuture: [],
			deletedTakenLecutures: [],
		});
	}

	submitEditedLecture() {
		const { deletedTakenLecutures, addedTakenLecutures } = this.state;
		const formData = {};
		formData.deletedTakenLecutures = deletedTakenLecutures.map((deletedTakenLecuture) => deletedTakenLecuture.id);
		formData.addedTakenLecutures = addedTakenLecutures.map((addedTakenLecuture) => addedTakenLecuture.id);
		this.clearEditedLecture();
	}

	deleteTakenLecture(lecture) {
		this.setState({
			deletedTakenLecutures: [...this.state.deletedTakenLecutures, lecture],
		});
	}

	addTakenLecture(lecture) {
		const { addedTakenLecutures, takenLectures } = this.state;

		const newLecture = this.formatLecture(lecture);
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
			year: '커스텀',
			semester: '커스텀',
			code: searchedLecture.lectureCode,
			name: searchedLecture.name,
			credit: searchedLecture.credit,
		};
	}

	containLecture(lectures, lecture) {
		return (
			lectures.filter((lec) => {
				return lec.code === lecture.code;
			}).length > 0
		);
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

			const { takenLectures, isEditableMode, addedTakenLecutures, deletedTakenLecutures, isLoading } = this.state;

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
          ${takenLecture.render()}
        </div>
        <div class="mypage-body__taken-lecture-list-container">
          ${takenLectureList.render(tableLectureListProps)}
      </div>
    </div>
      `;
		};
	}
}
