import Component from '../../core/component';
import { getResponseiveImage } from '../../helper/images';
import { departmentList } from '../../helper/data';

const sizes = {
	mobile: 486,
	tablet: 624,
	sm: 935,
	md: 1250,
	lg: 1300,
};

export default class LoadmapImage extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);
			const { major } = this.props;

			const majorImage =
				// eslint-disable-next-line no-nested-ternary
				major && departmentList[major] === '670'
					? this.props.major === '응용소프트웨어전공'
						? 'ict_sw_application'
						: 'ict_sw_data'
					: departmentList[major];

			const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/department/${majorImage}.png`);
			const [noneSizeAttr, noneSrcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/department/none.png`);

			return `
        <div class="loadmap-image" > 
			<div class="loadmap-image__title">전공이수로드맵</div>
			<img sizes="${sizeAttr}" srcset="${srcsetAttr}" class="loadmap-image__content" alt="loadmap-image__content" onerror="srcset='${noneSrcsetAttr}'"/>
        </div>
      `;
		};
	}
}
