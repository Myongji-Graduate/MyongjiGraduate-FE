import Component from "../../core/component";

export default class PieChart extends Component {

  setDefaultProps() {
    this.props = {
      percentage: 60,
      color: '#7590FF',
    }
  }

  template() {
    return (props) => {
      if (props) this.setProps(props)

      const { percentage, color } = this.props;

      return `
        <div class="pie-chart" style="--percentage:${percentage}; --border:0.6rem; --main-color:${color}">
          <div class="pie-chart__percentage-text">
          ${percentage}%
          </div>  
        </div>
      `
    }
  }
}