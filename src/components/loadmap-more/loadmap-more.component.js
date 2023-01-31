import Component from '../../core/component';
import { getResponseiveImage } from '../../helper/images';
import Button from '../button/button.component';
import { buttonTypes } from '../../helper/types';
import { departmentList } from '../../helper/data';

const sizes = {
	mobile: 130,
	tablet: 130,
	sm: 178,
	md: 178,
	lg: 238,
};
const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/maru_upperbody.png`);

export default class LoadmapMore extends Component {
	template() {
		const styleOption = {
			background: '#F5F5F5',
			color: 'black',
		};
		const majorPageButton = this.addChild(Button);
		const guideButton = this.addChild(Button);
		const majorPageButtonProps = {
			content: '전공홈페이지로 이동',
			type: buttonTypes.primary,
			size: 'md',
			key: 'majorpageButton',
			styleOption,
			onClick: () => window.open(`https://www.mju.ac.kr/mjukr/${departmentList[this.props.major]}/subview.do`),
		};
		const guideButtonProps = {
			content: '학사안내문으로 이동',
			type: buttonTypes.primary,
			size: 'md',
			key: 'guideButton',
			styleOption,
			onClick: () =>
				window.open(
					'https://www.mju.ac.kr/mjukr/257/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGbWp1a3IlMkYxNDMlMkYxOTU4MTElMkZhcnRjbFZpZXcuZG8lM0ZwYWdlJTNEMSUyNnNyY2hDb2x1bW4lM0QlMjZzcmNoV3JkJTNEJTI2YmJzQ2xTZXElM0QlMjZiYnNPcGVuV3JkU2VxJTNEJTI2cmdzQmduZGVTdHIlM0QlMjZyZ3NFbmRkZVN0ciUzRCUyNmlzVmlld01pbmUlM0RmYWxzZSUyNmlzVmlldyUzRHRydWUlMjZwYXNzd29yZCUzRCUyNg%3D%3D'
				),
		};
		return (props) => {
			if (props) this.setProps(props);
			return `
	    <div class="loadmap-more">
			<img sizes="${sizeAttr}" srcset="${srcsetAttr}" class="loadmap-more__img" alt="loadmap-more__img" />
			<div class="loadmap-more__content">
				<div class="loadmap-more__content-explain">
				<div class="loadmap-more__content-explain__title">학과 관련 정보</div>
				<div class="loadmap-more__content-explain__subtitle">더 확인하고 싶다면 클릭!</div>
				</div>
				<div class="loadmap-more__content-btn">
					<div class="loadmap-more__content-btn-item">${majorPageButton.render(majorPageButtonProps)}	</div>
					<div class="loadmap-more__content-btn-item">${guideButton.render(guideButtonProps)}	</div>
				</div>
			</div>
	    </div>
	  `;
		};
	}
}
