import Component from '../../core/component';

import loadingImage from '../../../public/images/loading-image.png';

export default class Loading extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="loading">
          <img src=${loadingImage} class="loading__loading-img" alt="loading__loading-img" />
        </div>
      `;
		};
	}
}
