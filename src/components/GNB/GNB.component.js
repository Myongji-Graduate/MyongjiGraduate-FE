import Component from "../../core/component";
import { store } from "../../store/store";

import mainLogo from '../../../public/icons/main-logo.svg';

export default class GNB extends Component {

  template() {
    // 자식들

    return (props) => {
      if (props) this.setProps(props);
      const { name } = this.props;

      return `
        <div class="GNB">
          <img class="GNB__main-logo" src=${mainLogo} />
          <div class="GNB__tab-navigator">
            <div>듀토리얼</div>
          </div>
        </div>
      `
    }
  }

  setEvent() {
    this.addEvent('click', '.GNB__main-logo', () => {
      const { router } = store.getState();
      router.navigate('/product');
    })
  }
}