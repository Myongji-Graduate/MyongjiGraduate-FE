import Component from '../../core/component';
import ResultLectureTableHeader from '../result-lecture-table-header/result-lecture-table-header.component';
import ResultLectureTableList from '../result-lecture-table-list/result-lecture-table-list.component';
import Loading from '../loading/loading.component';

export default class ResultLectureTable extends Component {
	setDefaultProps() {
		this.props = {
			part: '',
			lectures: [],
			takenLectures: [],
			isEditableMode: false,
			addedTakenLecutures: [],
			deletedTakenLecutures: [],
			deleteTakenLecture: () => {},
			deleteAddedTakenLecture: () => {},
			isLoading: false,
		};
	}

	template() {
		const resultlectureTableHeader = this.addChild(ResultLectureTableHeader);
		const resultlectureTableList = this.addChild(ResultLectureTableList);
		const loading = this.addChild(Loading);
		return (props) => {
			if (props) this.setProps(props);

			const { isLoading } = this.props;
			return `
      <div class="result-lecture-table">
        ${resultlectureTableHeader.render()}
        <div class="result-lecture-table__body">
       			   ${
									isLoading
										? `<div class="result-lecture-table__loading-container">${loading.render()}</div>`
										: resultlectureTableList.render({
												...this.props,
										  })
								}
        </div>
      </div>
      `;
		};
	}
}
