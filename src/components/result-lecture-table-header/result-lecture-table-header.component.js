import Component from '../../core/component';

export default class ResultLectureTableHeader extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="result-lecture-table-header">
          <div class="result-lecture-table-header__column">과목코드</div>
          <div class="result-lecture-table-header__column">과목명</div>
          <div class="result-lecture-table-header__column">학점</div>
        </div>
      `;
		};
	}
}
