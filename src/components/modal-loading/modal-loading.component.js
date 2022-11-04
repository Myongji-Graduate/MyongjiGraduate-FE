import Component from '../../core/component';

import Loading from '../loading/loading.component';

export default class ModalLoading extends Component {
	template() {
		const loading = this.addChild(Loading);
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="modal-loading">
          ${loading.render()}
          <div class="modal-loading__content">
            로딩중입니다...
          </div>
        </div>
      `;
		};
	}
}
