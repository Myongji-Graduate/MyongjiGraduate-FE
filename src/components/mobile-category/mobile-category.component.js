import Component from '../../core/component';
import * as utils from '../../helper/utils';

export default class MobileCategory extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { ismobileCategoryShow } = this.props;

			const modalStyle = {
				display: ismobileCategoryShow ? 'block' : 'none',
			};

			return `
        <div class="mobile-category" style=${utils.getInlineStyle(modalStyle)}>
           <div class="mobile-category__content">
                <div class="mobile-category__content-info"></div>
                <div class="mobile-category__content-menu"></div>
                <div class="mobile-category__content-sign"></div>
           </div>
        </div>
        `;
		};
	}
    // setEvent() {
	// 	const { togglemobileCategory,ismobileCategoryShow } = this.props;

	// 	this.addEvent('click', '.mobile-category', () => {              
    //         if (ismobileCategoryShow) togglemobileCategory();         
    //     }, true);
	// }
}
