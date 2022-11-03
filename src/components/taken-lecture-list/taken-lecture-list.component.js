import Component from '../../core/component';

import LectureTable from '../lecture-table/lecture-table.component';
import CategoryInfo from '../category-info/category-info.component';
import Button from '../button/button.component';
import { buttonTypes } from '../../helper/types';
import { store } from '../../store/store';

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
	// 	} else {import { store } from '../../store/store';

	// 		f = window.fetch;
	// 	}
	// 	const response = await f(
	// 		'https://b0182694-3460-46e7-97ce-3aceba5200ad.mock.pstmn.io/users/%7Bid%7D/taken-lectures'
	// 	);
	// 	const result = await response.json();

	// this.setState({
	// 	takenLectures: result.takenLectures,
	// });
	// }

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

	template() {
		this.fetchTakenLecture();

		const lectureTable = this.addChild(LectureTable);
		const tableInfo = this.addChild(CategoryInfo);
		const customButton = this.addChild(Button);
		const uploadNavigationButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);

			const { takenLectures } = this.state;

			const customButtonProps = {
				content: '커스텀하기',
				type: buttonTypes.grey,
				size: 'xs',
				key: 'custom-button',
			};

			const uploadButtonOnClick = () => {
				const { router } = store.getState();
				router.navigate('/file-upload');
			};

			const uploadNavigationButtonProps = {
				content: '업로드',
				type: buttonTypes.grey,
				size: 'xs',
				key: 'upload-navigation-button',
				onClick: uploadButtonOnClick,
			};

			return `
        <div class="taken-lecture-list">
          <div class="taken-lecture-list__header">
            ${tableInfo.render({
							part: '내 기이수 과목',
						})}
            <div class="taken-lecture-list__header-button-container">
              ${customButton.render(customButtonProps)}
              <div class="taken-lecture-list__divider"></div>
              ${uploadNavigationButton.render(uploadNavigationButtonProps)}
            </div>
          </div>
          ${lectureTable.render({
						lectures: takenLectures,
					})}
        </div>
      `;
		};
	}
}
