import Component from '../../core/component';
import ResultHeader from '../modal-result-header/modal-result-header.component';
import ResultContent from '../modal-result-content/modal-result-content.component';

export default class ModalElectiveLecture extends Component {
	setDefaultProps() {
		this.props = {
			part: '',
			explain: '',
			categoryData: {
				takenCredit: 0,
				totalCredit: 0,
				detailCategory: [],
			},
		};
	}

	template() {
		const resultHeader = this.addChild(ResultHeader);
		const resultContent = this.addChild(ResultContent);

		// const { graduationResult } = store.getState();
		// const variable = graduationResult.basicAcademicCulture;

		return (props) => {
			if (props) this.setProps(props);

			const {
				part,
				explain,
				toggleLecture,
				categoryData: { totalCredit, takenCredit, detailCategory },
			} = this.props;
			return `
        <div class="modal-elective-lecture">
          <div class="modal-elective-lecture__header">
          ${resultHeader.render({
						part,
						explain,
						totalCredit,
						takenCredit,
						toggleLecture,
					})}
          </div>
          <div class="modal-elective-lecture__content">
        ${resultContent.render({
					detailCategory,
					explain,
				})}
          </div>
       </div>
      `;
		};
	}
}
