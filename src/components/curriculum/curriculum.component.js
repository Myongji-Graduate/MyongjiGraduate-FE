import Component from '../../core/component';
import { getResponseiveImage } from '../../helper/images';
import { parseLectureResult } from '../../helper/parse';
import ModalLoading from '../modal-loading/modal-loading.component';
import Modal from '../modal/modal.component';

import InputGroup from '../input-group/input-group.component';
import Button from '../button/button.component';
import CurriculumResult from '../curriculum-result/curriculum-result.component';

import { fetchCurriculumInfos } from '../../async/lecture';
import { inputTypes, buttonTypes } from '../../helper/types';
import { departmentList } from '../../helper/data';

const sizes = {
	mobile: 17,
	tablet: 21,
	sm: 31,
	md: 41,
	lg: 41,
};

const [sizesAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/loadmap.png`);

export default class Curriculum extends Component {
	initState() {
		this.state = {
			auth: false,
			categoryList: {},
			lectureList: {},
			isLoading: false,
			year: '',
			major: '',
		};
	}

	async submitData() {
		const { year, major } = this.state;
		const formData = {
			entryYear: year,
			department: major,
		};
		this.setState({
			isLoading: true,
		});
		const response = await fetchCurriculumInfos(formData);
		this.setState({
			isLoading: false,
		});
		if (response) {
			const parseResult = parseLectureResult(response[1]);
			this.setState({ auth: true, categoryList: response[0], lectureList: parseResult });
		}
	}

	showDetail() {
		const curriculumResult = this.addChild(CurriculumResult);
		const { categoryList, lectureList, major, year, auth } = this.state;
		return `${
			auth
				? `<div class="box">${curriculumResult.render({
						credit: categoryList,
						lecture: lectureList,
						major,
						year,
				  })}</div>`
				: `<div></div>`
		}`;
	}

	validation() {
		const { year, major } = this.state;
		return major === '' || year === '';
	}

	template() {
		const inputStyle = {
			overflow: 'visible',
			background: '#F5F5F5',
			border: 'none',
			'border-radius': '2rem',
			width: '8rem',
		};
		const modalLoadingContainer = this.addChild(Modal);
		const modalLoading = this.addChild(ModalLoading);
		const yearInputGroup = this.addChild(InputGroup);
		const majorInputGroup = this.addChild(InputGroup);
		const curriculumButton = this.addChild(Button);

		const { isLoading } = this.state;

		const modalLoadingProps = {
			isModalShow: isLoading,
			contentComponent: modalLoading,
			width: 790,
			padding: 200,
			key: 'sign-in-loading',
		};

		return (props) => {
			if (props) this.setProps(props);

			return `
			<div class="curriculum">
			${modalLoadingContainer.render(modalLoadingProps)}
				<div class="box">
					<div class="curriculum__explain">
						<div class="curriculum__explain-title"> <img sizes="${sizesAttr}" srcset="${srcsetAttr}" class="curriculum__explain-icon" alt="curriculum__explain-icon" />나와 맞는 과목 정보 확인하기</div>
						<div class="curriculum__explain-detail">학과와 학번을 선택하시면 해당 조건과 일치하는 과목 정보들을 알려드릴게요!</div>
					</div>
					<div class="curriculum__select">
						<div class="curriculum__select__bundle">
							<div class="curriculum__select__bundle-label">학과</div>
							<div class="curriculum__select__bundle-input">${majorInputGroup.render({
								value: this.state.major,
								type: inputTypes.select,
								options: Object.keys(departmentList),
								onChange: (newMajor) => {
									this.setState({ major: newMajor });
								},
								key: 'curriculum-major',
								styleOption: inputStyle,
							})}</div>
						</div>
						<div class="curriculum__select__bundle">
							<div class="curriculum__select__bundle-label">학번</div>
							<div class="curriculum__select__bundle-input">${yearInputGroup.render({
								value: this.state.year,
								type: inputTypes.select,
								options: ['16', '17', '18', '19', '20', '21', '22'],
								onChange: (newYear) => {
									this.setState({ year: newYear });
								},
								key: 'curriculum-year',
								styleOption: inputStyle,
							})}</div>
						</div>
					</div>
					<div class="curriculum__btn">${curriculumButton.render({
						content: '확인',
						type: this.validation() ? buttonTypes.grey : buttonTypes.primary,
						size: 'md',
						key: 'curriculum-btn',
						disabled: this.validation(),
						onClick: this.submitData.bind(this),
					})}</div>
				</div>
				${this.state.auth ? this.showDetail() : `<div></div>`}
			</div>
			`;
		};
	}
}
