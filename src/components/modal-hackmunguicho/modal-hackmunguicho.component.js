import Component from '../../core/component';
import ResultHeader from '../modal-result-header/modal-result-header.component';
import ResultContent from '../modal-result-content/modal-result-content.component';

export default class ModalHackmunguicho extends Component {
	template() {
		const resultHeader = this.addChild(ResultHeader);
		const resultContent = this.addChild(ResultContent);

		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="modal-hackmunguicho">
          <div class="modal-hackmunguicho__header">
          ${resultHeader.render({
						part: '학문기초교양',
						explain: 'ICT융합대학 학문기초교양 중 미수강한 과목이 표시됩니다.',
						preCredit: 6,
						totalCredit: 18,
					})}
          </div>
          <div class="modal-hackmunguicho__content">
          ${resultContent.render({})}
          </div>
       </div>
      `;
		};
	}
}
