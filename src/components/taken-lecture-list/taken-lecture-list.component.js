import Component from '../../core/component';
import LectureTable from '../lecture-table/lecture-table.component';
import TakenLectureListHeader from '../taken-lecture-list-header/taken-lecture-list-header.component';

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

	deleteAddedTakenLecture(lecture) {
		const newAddedTakenLecutures = this.state.addedTakenLecutures.filter(
			(addedTakenLecuture) => addedTakenLecuture !== lecture.id
		);

		this.setState({
			addedTakenLecutures: newAddedTakenLecutures,
		});
	}

	template() {
		const lectureTable = this.addChild(LectureTable);
		const takenLectureListHeader = this.addChild(TakenLectureListHeader);

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

			return `
      <div class="taken-lecture-list">
			${takenLectureListHeader.render(takenLectureListHeaderProps)}
			${lectureTable.render(lectureTableProps)}
        </div>
      `;
		};
	}
}
