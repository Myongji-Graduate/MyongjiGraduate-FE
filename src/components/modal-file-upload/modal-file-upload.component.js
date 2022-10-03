import Component from "../../core/component";

import FileUploadGuide from "../file-upload-guide/file-upload-guide.component";
import FileUploadBox from "../file-upload-box/file-upload-box.component";

export default class ModalFileUpload extends Component {

  template() {
    const guide = this.addChild(FileUploadGuide);
    const fileUploadBox = this.addChild(FileUploadBox);

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
            <button class="modal-file-upload__submit-button">업로드</button>
          </div>
        </div>
      `
    }
  }

  setEvent() {
    const { onSubmit } = this.props;

    this.addEvent('click', '.modal-file-upload__submit-button', () => {
      onSubmit();
    })
  }
}