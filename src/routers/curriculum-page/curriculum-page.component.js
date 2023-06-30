import Component from '../../core/component';
import Header from '../../components/header/header.component';
import Curriculum from '../../components/curriculum/curriculum.component';

export default class CurriculumPage extends Component {
	template() {
		const header = this.addChild(Header);
		const curriculum = this.addChild(Curriculum);
		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="curriculum-page">
					<div class="curriculum-page__header">
					${header.render()}	
					</div>	
					<div class="curriculum-page__body">
						<div class="curriculum-page__body__content">
						${curriculum.render()}
						</div>
					</div>		
				</div>
			`;
		};
	}
}
