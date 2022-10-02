import Component from "../../core/component";

import GNB from "../../components/GNB/GNB.component";

import informationBackgroundImage from '../../../public/images/sub-background.png'
import backgroundBottomImage from '../../../public/images/header-bottom.png';

export default class InformationPage extends Component {
  template() {
    const gnb = this.addChild(GNB);

    return (props) => {
      if (props) this.setProps(props);

      return `
        <div class="information-page">
          <div class="information-page__header">
            ${gnb.render()}
            <img src=${informationBackgroundImage} class="information-page__background-img" />
            <img src=${backgroundBottomImage} class="information-page__bottom-img" />
          </div>
          <div class="information-page__body">
            <div class="information-page__content">asdasd</div>
          </div>
        </div>
      `
    }
  }
}