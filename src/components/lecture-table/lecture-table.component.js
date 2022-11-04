import Component from '../../core/component';
import LectureTableHeader from '../lecture-table-header/lecture-table-header.component';
import LectureTableList from '../lecture-table-list/lecture-table-list.component';
import Loading from '../loading/loading.component';

export default class LectureTable extends Component {
	setDefaultProps() {
		this.props = {
			lectures: [],
			isEditableMode: false,
			addedTakenLecutures: [],
			deletedTakenLecutures: [],
			deleteTakenLecture: () => {},
			deleteAddedTakenLecture: () => {},
			isLoading: false,
		};
	}

	template() {
		const lectureTableHeader = this.addChild(LectureTableHeader);
		const lectureTableList = this.addChild(LectureTableList);
		const loading = this.addChild(Loading);
		return (props) => {
			if (props) this.setProps(props);

			const { isLoading } = this.props;

			return `
      <div class="lecture-table">
        ${lectureTableHeader.render()}
        <div class="lecture-table__body">
          ${
						isLoading
							? `<div class="lecture-table__loading-container">${loading.render()}</div>`
							: lectureTableList.render({
									...this.props,
							  })
					}
        </div>
      </div>
      `;
		};
	}
}
