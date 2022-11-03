import Component from '../../core/component';

import LectureTable from '../lecture-table/lecture-table.component';
import CategoryInfo from '../category-info/category-info.component';

export default class TakenLectureList extends Component {
	initState() {
		this.state = {
			takenLectures: [],
		};
	}

	// async fetchTakenLecture() {
	// 	let f;
	// 	if (typeof window === 'undefined') {
	// 		f = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
	// 	} else {
	// 		f = window.fetch;
	// 	}
	// 	const response = await f(
	// 		'https://b0182694-3460-46e7-97ce-3aceba5200ad.mock.pstmn.io/users/%7Bid%7D/taken-lectures'
	// 	);
	// 	const result = await response.json();

	// 	this.setState({
	// 		takenLectures: result.takenLectures,
	// 	});
	// }

	template() {
		// this.fetchTakenLecture();
		const lectureTable = this.addChild(LectureTable);
		const tableInfo = this.addChild(CategoryInfo);

		return (props) => {
			if (props) this.setProps(props);

			const { takenLectures } = this.state;

			return `
        <div class="taken-lecture-list">
          ${tableInfo.render({
						part: '내 기이수 과목',
					})}
          ${lectureTable.render({
						lectures: takenLectures,
					})}
        </div>
      `;
		};
	}
}
