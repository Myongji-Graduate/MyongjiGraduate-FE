import Component from '../../core/component';
import LectureTableHeader from '../lecture-table-header/lecture-table-header.component';
import LectureTableList from '../lecture-table-list/lecture-table-list.component';

export default class LectureTable extends Component {
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

	template() {
		const lectureTableHeader = this.addChild(LectureTableHeader);
		const lectureTableList = this.addChild(LectureTableList);
		return (props) => {
			if (props) this.setProps(props);

			return `
      <div class="lecture-table">
        ${lectureTableHeader.render()}
        <div class="lecture-table__body">
          ${lectureTableList.render({
						...this.props,
					})}
        </div>
      </div>
      `;
		};
	}
}
