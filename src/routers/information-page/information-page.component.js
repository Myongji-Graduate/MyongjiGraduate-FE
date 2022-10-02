import Component from "../../core/component";

import GNB from "../../components/GNB/GNB.component";

import informationBackgroundImage from '../../../public/images/sub-background.png'

export default class InformationPage extends Component {
  template() {
    const gnb = this.addChild(GNB);

    return (props) => {
      if (props) this.setProps(props);

      return `
        <div class="information-page">
          <div class="information-page__header">
            ${gnb.render()}
            <div class="information-page__background"></div>
            <img src=${informationBackgroundImage} class="information-page__background-img" />
          </div>
          </div>
        </div>
      `
    }
  }
}