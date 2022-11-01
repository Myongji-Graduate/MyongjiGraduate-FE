import Component from '../../core/component';

export default class modalHeader extends Component {
	setDefaultProps() {
		this.props = {
			title: '제목',
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { title } = this.props;
			return `
       <div class="modal-header">
            <div class="modal-header__title">${title}</div>
            <div class="modal-header__underline"></div>
       </div>
      `;
		};
	}
}
