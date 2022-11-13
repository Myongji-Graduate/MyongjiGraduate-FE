import Component from '../../core/component';

import PieChart from '../pie-chart/pie-chart.component';

export default class Mypage extends Component {
	setDefaultProps() {
		this.props = {
			totalCredit: 0,
			takenCredit: 0,
			name: '',
			studentNumber: '',
			department: '',
      complete: false,
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);
			const pieChart = this.addChild(PieChart);
			const { totalCredit, takenCredit, name, studentNumber, department, complete } = this.props;

			const percentage = Math.round((takenCredit / totalCredit) * 100);
      const leftCredit = totalCredit - takenCredit;

			return `
        <div class="mypage">
        <div class="mypage__totalcredit">       
       ${complete
       ? `<div class="mypage__totalcredit-credit">${name}</div> 
          <div>님 졸업을 축하합니다 ! </div>`
       : `<div>총 기준학점보다 </div>       
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
        <div>총 기준 학점</div>
        <div>총 이수 학점</div>
        <div>졸업사정결과</div>
        </div>
        <div class="mypage__info__table-value">
        <div>${name}</div>  
        <div>${studentNumber}</div>  
        <div>${department}</div>  
        <div>${totalCredit}</div>  
        <div>${takenCredit}</div>  
        <div>${takenCredit}</div>  
        </div>    
         </div> 
        <div class="mypage__info__piechart">${pieChart.render({
					percentage,
				})}</div> 
        </div>
        </div>
      `;
		};
	}
}
