import Component from '../../core/component';

export default class LectureTable extends Component {
	setDefaultProps() {
		this.props = {
			lectures: [],
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { lectures } = this.props;

			return `
      <div class="lecture-table">
        <div class="lecture-table__head">
              <div class="lecture-table__head__column">과목코드</div>
              <div class="lecture-table__head__column">과목명</div>
              <div class="lecture-table__head__column">학점</div>
        </div>
        <div class="lecture-table__body">
          ${lectures.map((lecture) => {
						return `
            <div class="lecture-table__body__tr">
            <div class="lecture-table__body__tr__column">${lecture.code}</div>
            <div class="lecture-table__body__tr__column">${lecture.name}</div>
            <div class="lecture-table__body__tr__column">${lecture.credit}</div>
            </div>
            `;
					})}
        </div>
      </div>
      `;
		};
	}
}
