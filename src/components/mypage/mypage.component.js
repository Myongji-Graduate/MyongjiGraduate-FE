import Component from '../../core/component';

import PieChart from '../pie-chart/pie-chart.component';

export default class Mypage extends Component {
	setDefaultProps() {
		this.props = {
			totalCredit: 0,
			takenCredit: 0,
			name: '',
			studentNumber: '',
			major: '',
			complete: false,
		};
	}

	template() {
		const pieChart = this.addChild(PieChart);
		return (props) => {
			if (props) this.setProps(props);
			const { totalCredit, takenCredit, name, studentNumber, major, complete } = this.props;

			const percentage = Math.round((takenCredit / totalCredit) * 100);
			const leftCredit = totalCredit - takenCredit;

			return `
        <div class="mypage">
        <div class="mypage__totalcredit">       
       ${
					complete
						? `<div class="mypage__totalcredit-credit">${name}</div> 
          <div>님 졸업을 축하합니다 ! </div>`
						: `<div>졸업필요학점보다 </div>       
          <div class="mypage__totalcredit-credit">&nbsp;${leftCredit}&nbsp;</div> 
          <div> 학점이 부족합니다</div> `
				}      
        </div>

        <div class="mypage__info">
        <div class="mypage__info__table">
        <div class="mypage__info__table-key">
        <div>이름</div>       
        <div>학번</div>
        <div>학과</div>
        <div>졸업필요학점</div>
        <div>총 이수 학점</div>
        <div>졸업가능여부</div>
        </div>
        <div class="mypage__info__table-value">
          <div>${name}</div>  
          <div>${studentNumber}</div>  
          <div>${major}</div>  
          <div>${totalCredit}</div>  
          <div>${takenCredit}</div>  
          <div>${complete ? '가능' : '불가능'}</div>  
        </div>    
         </div> 
        <div class="mypage__info__piechart">${pieChart.render({
					percentage,
				})}</div> 
        </div>
        <div class="mypage__explain">
        *모든 기준 학점은 채플을 포함하지 않습니다.</br>
        *서비스의 결과는 공식적인 효력을 갖지 않습니다. 정확한 졸업사정결과는 소속 단과대 교학팀에서의 확인을 권장합니다.
        </div>
        </div>
      `;
		};
	}
}
