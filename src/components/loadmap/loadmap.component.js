// import { result1, result2 } from './data';
import Component from '../../core/component';
import { getResponseiveImage } from '../../helper/images';
import { parseLectureResult } from '../../helper/parse';

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
	initState() {
		this.state = {
			year: '',
			major: '',
			auth: false,
			categoryList: {},
			lectureList: {},
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

		const response = await fetchLoadmapInfos(formData);
		this.setState({
			isLoading: false,
		});

		if (response) {
			const parseResult = parseLectureResult(response[1]);
			this.setState({ auth: true, categoryList: response[0], lectureList: parseResult });
		}
	}

	validation() {
		const { major, year } = this.state;
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

		const yearInputGroup = this.addChild(InputGroup);
		const majorInputGroup = this.addChild(InputGroup);
		const loadmapButton = this.addChild(Button);
		const loadmapResult = this.addChild(LoadmapResult);

		const yearInputProps = {
			value: this.state.year,
			type: inputTypes.select,
			options: ['19', '20', '21', '22'],
			onChange: (newValue) => {
				this.setState({ year: newValue });
			},
			key: 'loadmap-year',
			styleOption: inputStyle,
		};
		const majorInputProps = {
			value: this.state.major,
			type: inputTypes.select,
			options: Object.keys(departmentList),
			onChange: (newValue) => {
				this.setState({ major: newValue });
			},
			key: 'loadmap-major',
			styleOption: inputStyle,
		};

		return (props) => {
			if (props) this.setProps(props);
			const { categoryList, lectureList, major } = this.state;
			return `
			<div class="loadmap">
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
						type: this.validation() ? buttonTypes.grey : buttonTypes.primary,
						size: 'md',
						key: 'loadmap-btn',
						disabled: this.validation(),
						onClick: this.submitData.bind(this),
					})}</div>
				</div>
					${
						this.state.auth
							? `<div class="box">${loadmapResult.render({
									credit: categoryList,
									lecture: lectureList,
									major,
							  })}</div>`
							: `<div></div>`
					}
			</div>
			`;
		};
	}
}
