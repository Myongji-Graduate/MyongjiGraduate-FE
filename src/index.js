import './nomalize.scss';
import Component from "./core/component";

export default class MainPage extends Component {
  initState() {
    this.state = {};
  }

  template() {
    return `
      <div class="main-page">
        hello world
      </div>
    `;
  }
}

new MainPage(document.querySelector('.app-container'))
