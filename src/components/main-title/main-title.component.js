import Component from "../../core/component";

import titleCap from '../../../public/icons/main_title_cap.svg';

export default class maintitle extends Component {

  template() {
 
    return (props) => {
      if (props) this.setProps(props);

      return `
        <div class="main-title">          
          <div class="main-title__logo">
            <img class="main-title__logo__cap" src=${titleCap}/>
            <div class="main-title__logo__text"><span>졸</span>업을 <span>부</span>탁해</div>
          </div>
		     <div class="main-title__explain">명지인을 위한 간편 졸업요건 검사 사이트</div>
        </div>
      `
    }
  }
}