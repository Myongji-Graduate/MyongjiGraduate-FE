import Component from '../../core/component';
import LectureTable from '../lecture-table/lecture-table.component';
import TakenLectureListHeader from '../taken-lecture-list-header/taken-lecture-list-header.component';
import SearchLectureTable from '../search-lecture-table/search-lecture-table.component';

export default class TakenLectureList extends Component {
	initState() {
		this.state = {
			isLoading: false,
		};
	}

	setDefaultProps() {
		this.props = {
			takenLectures: [],
			isEditableMode: false,
			addedTakenLecutures: [],
			deletedTakenLecutures: [],
			deleteTakenLecture: () => {},
			deleteAddedTakenLecture: () => {},
			clearEditedLecture: () => {},
			toggleEditableMode: () => {},
			submitEditedLecture: () => {},
			addTakenLecture: () => {},
			isLoading: false,
		};
	}

	template() {
		const lectureTable = this.addChild(LectureTable);
		const takenLectureListHeader = this.addChild(TakenLectureListHeader);
		const searchLectureTable = this.addChild(SearchLectureTable);

		return (props) => {
			if (props) this.setProps(props);
			const {
				takenLectures,
				isEditableMode,
				addedTakenLecutures,
				deletedTakenLecutures,
				isLoading,
				deleteTakenLecture,
				deleteAddedTakenLecture,
				clearEditedLecture,
				toggleEditableMode,
				submitEditedLecture,
				addTakenLecture,
			} = this.props;

			const lectureTableProps = {
				lectures: takenLectures,
				isEditableMode,
				addedTakenLecutures,
				deletedTakenLecutures,
				deleteTakenLecture,
				deleteAddedTakenLecture,
				isLoading,
			};

			const takenLectureListHeaderProps = {
				isEditableMode,
				toggleEditableMode,
				clearEditedLecture,
				submitEditedLecture,
			};

			const searchLectureTableProps = {
				addTakenLecture,
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
