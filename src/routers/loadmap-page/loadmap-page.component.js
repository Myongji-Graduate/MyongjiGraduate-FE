import Component from '../../core/component';
import Header from '../../components/header/header.component';
import Loadmap from '../../components/loadmap/loadmap.component';

export default class LoadmapPage extends Component {
	template() {
		const header = this.addChild(Header);
		const loadmap = this.addChild(Loadmap);
		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="loadmap-page">
					<div class="loadmap-page__header">
					${header.render()}	
					</div>	
					<div class="loadmap-page__body">
						<div class="loadmap-page__body__content">
						${loadmap.render()}
						</div>
					</div>		
				</div>
			`;
		};
	}
}
