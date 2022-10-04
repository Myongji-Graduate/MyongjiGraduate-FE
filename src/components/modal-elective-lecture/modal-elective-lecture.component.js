import Component from '../../core/component';
import ResultHeader from '../modal-result-header/modal-result-header.component';
import ResultContent from '../modal-result-content/modal-result-content.component';
import { store } from '../../store/store';

export default class ModalElectiveLecture extends Component {

	setDefaultProps() {
		this.props = {
			part: '학문기초교양',
			explain: 'ICT융합대학 학문기초교양 중 미수강한 과목이 표시됩니다.',
			categoryData: {
				takenCredit: 0,
				totalCredit: 0,
				detailCategory: []
			}
		}
	}

	template() {
		const resultHeader = this.addChild(ResultHeader);
		const resultContent = this.addChild(ResultContent);



		// const { graduationResult } = store.getState();
		// const variable = graduationResult.basicAcademicCulture;

		return (props) => {
			console.log(props);
			if (props) this.setProps(props);

			const { part, explain, categoryData: { totalCredit, takenCredit, detailCategory }} = this.props;


			return `
        <div class="modal-elective-lecture">
          <div class="modal-elective-lecture__header">
          ${resultHeader.render({
						part,
						explain,
						totalCredit,
						takenCredit,
					})}
          </div>
          <div class="modal-elective-lecture__content">
        ${resultContent.render({ detailCategory })}
          </div>
       </div>
      `;
		};
	}
}
