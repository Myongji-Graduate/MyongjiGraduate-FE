import Component from '../../core/component';

import fileUplpadIcon from '../../../public/icons/file-upload-icon.svg';
import completeCheckIcon from '../../../public/icons/complete-check.svg';

export default class FileUploadBox extends Component {
	setDefaultProps() {
		this.props = {
			file: undefined,
			onDrag: () => {},
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { file } = this.props;

			return `
        <div class="file-upload-box">
          <labal class="file-upload-box__label">
            <img class="file-upload-box__upload-icon" src=${file ? completeCheckIcon : fileUplpadIcon} />
          </label>
            <div class="file-upload-box__upload-text">
						${file ? file.name : "마우스로 드래그 하거나<br/>아이콘을 눌러 직접 추가해주세요"}
            </div>
            <input type="file" class="file-upload-box__upload-input" >
        </div>
      `;
		};
	}

	setEvent() {
		const { onDrag } = this.props;

		this.addEvent('dragover', '.file-upload-box', (e) => {
			e.preventDefault();
		});

		this.addEvent('drop', '.file-upload-box', (e) => {
			e.preventDefault();
			const file = e.dataTransfer.files[0];
			if (file.type === 'application/pdf') onDrag(file);
		});

		this.addEvent('click', '.file-upload-box__upload-icon', (e) => {
			const fileUploadInput = document.querySelector('.file-upload-box__upload-input');
			fileUploadInput.click();
		});

		this.addEvent('change', '.file-upload-box__upload-input', (e) => {
			const file = e.target.files[0];
			if (file.type === 'application/pdf') onDrag(file);
		});
	}
}
