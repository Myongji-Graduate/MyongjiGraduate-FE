import Component from "../../core/component";

import { store } from "../../store/store";
import { fetchApi } from "../../store/async-action";

import InputGroup from "../input-group/input-group.component";
import Modal from "../modal/modal.component";
import ModalFileUpload from "../modal-file-upload/modal-file-upload.component";
import ModalLoading from "../modal-loading/modal-loading.component";
import Button from "../button/button.component";

import pencilIcon from '../../../public/icons/pencil-icon.svg';
import { buttonTypes, inputTypes } from "../../helper/types";

export default class InformationForm extends Component {

  initState() {
    this.state = {
      studentNumber: "",
      major: "",
      file: undefined,
      isFileUploadModalShow: false
    }
  }

  toggleFileUploadModal() {
		this.setState({
			isFileUploadModalShow: !this.state.isFileUploadModalShow,
		});
	}

  uploadFile(file) {
    console.log(file);
    this.setState({
      file: file
    })
  }

  submitData() {
    store.dispatch(fetchApi());
  }

  template() {
    const studentNumberInputGroup = this.addChild(InputGroup);
    const majorInputGroup = this.addChild(InputGroup);
    const displayModalButton = this.addChild(Button);

    const modal = this.addChild(Modal);
    const modalFileUpload = this.addChild(ModalFileUpload);
    const modalLoading = this.addChild(ModalLoading);

    return (props) => {
      if (props) this.setProps(props);

      const { isLoadingModalShow } = store.getState();

      const modalLoadingProps = {
        isModalShow: isLoadingModalShow,
        contentComponent: modalLoading,
        width: 790,
        padding: 200
      }

      const modalFileUploadProps = {
        onDrag: this.uploadFile.bind(this),
        file: this.state.file,
        onSubmit: this.submitData,
      }

      const modalProps = {
        isModalShow: this.state.isFileUploadModalShow,
        toggleModal: this.toggleFileUploadModal.bind(this),
        contentComponent: modalFileUpload,
        contentComponentProps: {...modalFileUploadProps},
        width: 1220,
        padding: 100
      }

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
        ${modal.render(modalProps)}
        ${modal.render(modalLoadingProps)}
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
              ${displayModalButton.render({
                content: '다음으로',
                type: buttonTypes.primary,
                onClick: this.toggleFileUploadModal.bind(this),
                size: 'md',
                key: 'modal-display'
              })}
            </div>
          </div>
        </div>
      `;
    }
  }
}