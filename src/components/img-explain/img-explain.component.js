import Component from '../../core/component';
import { getResponseiveImage } from '../../helper/images';


const sizes_feature = {
	mobile: 150,
	tablet: 176,
	sm: 275,
	md: 371,
	lg: 366,
};

const sizes_tutorial = {
	mobile: 176,
	tablet: 224,
	sm: 224,
	md: 288,
	lg: 384,
};

export default class ImgExplain extends Component {
	setDefaultProps() {
		this.props = {
			fis: true,
			img: '이미지',
			title: '제목',
			expalin: '설명',
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);
			const { fix, img, title, explain } = this.props;
			const [sizeAttr, srcsetAttr] = getResponseiveImage( fix ? sizes_feature : sizes_tutorial, `${IMAGE_URL}/${img}.png`);
			return `
       <div class="img-explain">
			<div ><img
			 sizes="${sizeAttr}"
			 srcset="${srcsetAttr}"        
			 class="img-explain__img" 
			 alt="img-explain__img"/></div>
            <div class="img-explain__title">${title}</div>
			<div class="img-explain__explain">${explain}</div>           
       </div>
      `;
		};
	}
}
