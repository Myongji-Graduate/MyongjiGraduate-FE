import Component from '../../core/component';

import PieChart from '../pie-chart/pie-chart.component';

export default class Mypage extends Component {
  setDefaultProps() {
		this.props = {
		totalCredit: 0,
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);
      const pieChart = this.addChild(PieChart);
      const {totalCredit } = this.props;

			return `
        <div class="mypage">
        <div class="mypage__totalcredit">
        총 기준학점보다 <span>${totalCredit}</span> 학점이 부족합니다
        </div>
        <div class="mypage__info">
        <table class="mypage__info-table">
          <tr><td>이름</td><td>${totalCredit}</td></tr>
          <tr><td>학번</td><td>${totalCredit}</td></tr>
          <tr><td>학과</td><td>${totalCredit}</td></tr>
          <tr><td>총 기준 학점</td><td>${totalCredit}</td></tr>
          <tr><td>총 이수 학점</td><td>${totalCredit}</td></tr>
        </table> 
        <div class="mypage__info-piechart">${pieChart.render()}</div> 
        </div> 
        </div>
      `;
		};
	}
}
