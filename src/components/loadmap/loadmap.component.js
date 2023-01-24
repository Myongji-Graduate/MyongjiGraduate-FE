import Component from '../../core/component';

export default class Loadmap extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="loadmap">
				loadmap page
				</div>
			`;
		};
	}
}
