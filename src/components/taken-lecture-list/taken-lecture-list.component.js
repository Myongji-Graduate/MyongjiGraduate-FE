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
		};
	}

	fetchTakenLecture() {
		if (typeof window !== 'undefined') {
			fetch('/api/takenLectures')
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					this.setState({
						takenLectures: result.takenLectures,
					});
				});
		}
	}

	toggleEditableMode() {
		this.setState({
			isEditableMode: !this.state.isEditableMode,
		});
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
		this.fetchTakenLecture();

		const lectureTable = this.addChild(LectureTable);
		const takenLectureListHeader = this.addChild(TakenLectureListHeader);

		return (props) => {
			if (props) this.setProps(props);

			const { takenLectures, isEditableMode, addedTakenLecutures, deletedTakenLecutures } = this.state;

			const lectureTableProps = {
				lectures: takenLectures,
				isEditableMode,
				addedTakenLecutures,
				deletedTakenLecutures,
				deleteTakenLecture: this.deleteTakenLecture.bind(this),
				deleteAddedTakenLecture: this.deleteAddedTakenLecture.bind(this),
			};

			const takenLectureListHeaderProps = {
				isEditableMode,
				toggleEditableMode: this.toggleEditableMode.bind(this),
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
