import Component from '../../core/component';
import ResultHeader from '../modal-result-header/modal-result-header.component';
import ResultContent from '../modal-result-content/modal-result-content.component';
import CategoryLabel from '../category-name-label/category-name-label.component';
import { store } from '../../store/store';

export default class ModalHackgyo extends Component {
	template() {
		const resultHeader = this.addChild(ResultHeader);
		const resultContent = this.addChild(ResultContent);
		const categoryLabel = this.addChild(CategoryLabel);
		const { graduationResult } = store.getState();
		const variable = graduationResult.coreCulture;
		return (props) => {
			if (props) this.setProps(props);
			return `
        <div class="modal-hackgyo">
          <div class="modal-hackgyo__header">
          ${resultHeader.render({
						part: '핵심교양',
						explain: '핵심교양 과목 중 미수강한 과목이 표시됩니다.',
						takenCredits: variable.takenCredits,
						totalCredits: variable.totalCredits,
					})}
          </div>
          <div class="modal-hackgyo__content">
		  <div class="modal-hackgyo__content-label"> ${categoryLabel.render({part:'역사와 철학'})}</div>
          ${resultContent.render({ content: variable , part : '핵심교양'})}
          </div>
       </div>
      `;
		};
	}
}
