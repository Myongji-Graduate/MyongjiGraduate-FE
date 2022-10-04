import Component from '../../core/component';

export default class Mypage extends Component {
  setDefaultProps() {
		this.props = {
		totalCredit: 0,
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="mypage">
        <div class="mypage__totalcredit">
        총 기준학점보다 ${totalCredit}이 부족합니다
        </div>
        <table>
          <tr><td>이름</td><td>${totalCredit}</td></tr>
          <tr><td>학번</td><td>${totalCredit}</td></tr>
          <tr><td>학과</td><td>${totalCredit}</td></tr>
          <tr><td>총 기준 학점</td><td>${totalCredit}</td></tr>
          <tr><td>총 이수 학점</td><td>${totalCredit}</td></tr>
        </table>   
        </div>
      `;
		};
	}
}
