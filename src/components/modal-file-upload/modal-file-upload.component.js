import Component from "../../core/component";

import FileUploadGuide from "../file-upload-guide/file-upload-guide.component";
import FileUploadBox from "../file-upload-box/file-upload-box.component";
import Button from "../button/button.component";
import { buttonTypes } from "../../helper/types";

export default class ModalFileUpload extends Component {

  template() {
    const guide = this.addChild(FileUploadGuide);
    const fileUploadBox = this.addChild(FileUploadBox);
    const submitButton = this.addChild(Button);

    return (props) => {
      if (props) this.setProps(props)

      return `
        <div class="modal-file-upload">
          <div class="modal-file-upload__header">
            기이수 성적 업로드
          </div>
          <div class="modal-file-upload__divider"></div>
          <div class="modal-file-upload__body">
            <div class="modal-file-upload__guide-container">
              ${guide.render()}
            </div>
            <div class="modal-file-upload__file-upload-box-container">
              ${fileUploadBox.render({...this.props})}
            </div>
          </div>
          <div class="modal-file-upload__footer">
            ${submitButton.render({
              content: '업로드',
              type: buttonTypes.primary,
              size: 'md',
              key: 'modal-submit',
              onClick: this.props.onSubmit
            })}
          </div>
        </div>
      `
    }
  }

}