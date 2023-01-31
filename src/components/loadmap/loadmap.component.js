// import { result1, result2 } from './data';
import Component from '../../core/component';
import { getResponseiveImage } from '../../helper/images';
import { parseLectureResult } from '../../helper/parse';
import ModalLoading from '../modal-loading/modal-loading.component';
import Modal from '../modal/modal.component';

import InputGroup from '../input-group/input-group.component';
import Button from '../button/button.component';
import LoadmapResult from '../loadmap-result/loadmap-result.component';

import { fetchLoadmapInfos } from '../../async/lecture';
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

export default class Loadmap extends Component {
	setDefaultProps() {
		this.props = {
			year: '22',
			major: '응용소프트웨어전공',
		};
	}

	initState() {
		this.state = {
			auth: false,
			categoryList: {},
			lectureList: {},
			isLoading: false,
		};
	}

	async submitData() {
		const { year, major } = this.props;
		const formData = {
			entryYear: year,
			department: major,
		};
		this.setState({
			isLoading: true,
		});
		const response = await fetchLoadmapInfos(formData);
		this.setState({
			isLoading: false,
		});
		if (response) {
			const parseResult = parseLectureResult(response[1]);
			this.setState({ auth: true, categoryList: response[0], lectureList: parseResult });
		}
	}

	showDetail() {
		const loadmapResult = this.addChild(LoadmapResult);
		const { categoryList, lectureList } = this.state;
		const { major, year } = this.props;
		return `${
			this.state.auth
				? `<div class="box">${loadmapResult.render({
						credit: categoryList,
						lecture: lectureList,
						major,
						year,
				  })}</div>`
				: `<div></div>`
		}`;
	}

	validation() {
		const { year, major } = this.props;
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
		const loadmapButton = this.addChild(Button);

		const { isLoading } = this.state;

		const modalLoadingProps = {
			isModalShow: isLoading,
			contentComponent: modalLoading,
			width: 790,
			padding: 200,
			key: 'sign-in-loading',
		};
		const yearInputProps = {
			type: inputTypes.select,
			options: ['16', '17', '18', '19', '20', '21', '22'],
			onChange: (newYear) => {
				this.setProps({ year: newYear });
			},
			key: 'loadmap-year',
			styleOption: inputStyle,
		};
		const majorInputProps = {
			type: inputTypes.select,
			options: Object.keys(departmentList),
			onChange: (newMajor) => {
				this.setProps({ major: newMajor });
			},
			key: 'loadmap-major',
			styleOption: inputStyle,
		};

		return (props) => {
			if (props) this.setProps(props);

			return `
			<div class="loadmap">
			${modalLoadingContainer.render(modalLoadingProps)}
				<div class="box">
					<div class="loadmap__explain">
						<div class="loadmap__explain-title"> <img sizes="${sizesAttr}" srcset="${srcsetAttr}" class="loadmap__explain-icon" alt="loadmap__explain-icon" />나와 맞는 과목 정보 확인하기</div>
						<div class="loadmap__explain-detail">학과와 학번을 선택하시면 해당 조건과 일치하는 과목 정보들을 알려드릴게요!</div>
					</div>
					<div class="loadmap__select">
						<div class="loadmap__select__bundle">
							<div class="loadmap__select__bundle-label">학과</div>
							<div class="loadmap__select__bundle-input">${majorInputGroup.render(majorInputProps)}</div>
						</div>
						<div class="loadmap__select__bundle">
							<div class="loadmap__select__bundle-label">학번</div>
							<div class="loadmap__select__bundle-input">${yearInputGroup.render(yearInputProps)}</div>
						</div>
					</div>
					<div class="loadmap__btn">${loadmapButton.render({
						content: '확인',
						type: buttonTypes.primary,
						size: 'md',
						key: 'loadmap-btn',
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
