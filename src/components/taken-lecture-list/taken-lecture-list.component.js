import Component from '../../core/component';
import LectureTable from '../lecture-table/lecture-table.component';
import TakenLectureListHeader from '../taken-lecture-list-header/taken-lecture-list-header.component';
import SearchLectureTable from '../search-lecture-table/search-lecture-table.component';
import { createAction, store } from '../../store/store';
import { ERROR_ACTION_TYPES, ERROR_TYPES } from '../../store/types';

export default class TakenLectureList extends Component {
	initState() {
		this.state = {
			takenLectures: [],
			isEditableMode: false,
			addedTakenLecutures: [],
			deletedTakenLecutures: [],
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

		if (this.containLecture(addedTakenLecutures, lecture)) {
			store.dispatch(
				createAction(ERROR_ACTION_TYPES.SHOW_ERROR, {
					error: ERROR_TYPES.ALREADY_ADD_LECTURE,
				})
			);
			return;
		}

		if (this.containLecture(takenLectures, lecture)) {
			store.dispatch(
				createAction(ERROR_ACTION_TYPES.SHOW_ERROR, {
					error: ERROR_TYPES.ALREADY_ADD_TAKEN,
				})
			);
			return;
		}

		this.setState({
			addedTakenLecutures: [...this.state.addedTakenLecutures, lecture],
		});
	}

	containLecture(lectures, lecture) {
		return (
			lectures.filter((lec) => {
				return lec.id === lecture.id;
			}).length > 0
		);
	}

	deleteAddedTakenLecture(lecture) {
		const newAddedTakenLecutures = this.state.addedTakenLecutures.filter(
			(addedTakenLecuture) => addedTakenLecuture.id !== lecture.id
		);
		console.log(newAddedTakenLecutures);

		this.setState({
			addedTakenLecutures: newAddedTakenLecutures,
		});
	}

	template() {
		const lectureTable = this.addChild(LectureTable);
		const takenLectureListHeader = this.addChild(TakenLectureListHeader);
		const searchLectureTable = this.addChild(SearchLectureTable);

		return (props) => {
			if (props) this.setProps(props);

			const { takenLectures, isEditableMode, addedTakenLecutures, deletedTakenLecutures, isLoading } = this.state;

			const lectureTableProps = {
				lectures: takenLectures,
				isEditableMode,
				addedTakenLecutures,
				deletedTakenLecutures,
				deleteTakenLecture: this.deleteTakenLecture.bind(this),
				deleteAddedTakenLecture: this.deleteAddedTakenLecture.bind(this),
				isLoading,
			};

			const takenLectureListHeaderProps = {
				isEditableMode,
				toggleEditableMode: this.toggleEditableMode.bind(this),
				clearEditedLecture: this.clearEditedLecture.bind(this),
				submitEditedLecture: this.submitEditedLecture.bind(this),
			};

			const searchLectureTableProps = {
				addTakenLecture: this.addTakenLecture.bind(this),
			};

			return `
      <div class="taken-lecture-list">
			${isEditableMode ? searchLectureTable.render(searchLectureTableProps) : ``}
			${takenLectureListHeader.render(takenLectureListHeaderProps)}
			${lectureTable.render(lectureTableProps)}
        </div>
      `;
		};
	}
}
