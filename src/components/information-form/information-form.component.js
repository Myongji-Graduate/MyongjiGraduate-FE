import Component from "../../core/component";

import InputGroup from "../input-group/input-group.component";

import pencilIcon from '../../../public/icons/pencil-icon.svg';
import { inputTypes } from "../../helper/types";

export default class InformationForm extends Component {

  initState() {
    this.state = {
      studentNumber: "",
      major: "",
    }
  }

  template() {
    const studentNumberInputGroup = this.addChild(InputGroup);
    const majorInputGroup = this.addChild(InputGroup);

    return (props) => {
      if (props) this.setProps(props);

      const studentNumberInputProps = {
        name: '학번',
        placeholder: "한글을 입력하세요",
        value: this.state.studentNumber,
        onChange: (newValue) => {
          this.setState({studentNumber: newValue})}
      };
      
      const majorInputProps = {
        name: '학과',
        placeholder: '학과를 선택해주세요.',
        value: this.state.major,
        type: inputTypes.select,
        options: ['데이터테크놀로지', '응용소프트웨어', '디지털콘텐츠디자인'],
        onChange: (newValue) => {
          this.setState({major: newValue})}
      }

      return `
        <div class="information-form">
          <div class="information-form__header">
            <img class="information-form__pencil-icon" src=${pencilIcon} />
            <span class="information-form__header-text">
              정보를 입력해주세요
            </span>
          </div>
          <div class="information-form__body">
            <div class="information-form__studentNumber-input-group-container">
              ${studentNumberInputGroup.render(studentNumberInputProps)}
            </div>
            <div class="information-form__major-input-group-container">
              ${majorInputGroup.render(majorInputProps)}
            </div>
            <div class="information-form__create-modal-button-container">
              <button class="information-form__create-modal-button">다음으로</button>
            </div>
          </div>
        </div>
      `
    }
  }
}