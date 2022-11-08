import Component from '../../core/component';

import Header from '../../components/header/header.component';
import FileUploadContent from '../../components/file-upload-content/file-upload-content.component';
import Modal from '../../components/modal/modal.component';
import ModalLoading from '../../components/modal-loading/modal-loading.component';
import { fetchPDFFileUpload } from '../../async/file';
import { handleErrorObject } from '../../helper/errorHandler';
import { store } from '../../store/store';
import { init } from '../../helper/auth';

export default class FileUploadPage extends Component {
	initState() {
		this.state = {
			file: undefined,
			isLoading: false,
		};
	}

	uploadFile(file) {
		this.setState({
			file,
		});
	}

	async submitData() {
		this.setState({
			isLoading: true,
		});
		const formData = new FormData();

		formData.append('file', this.state.file, 'grade.pdf');
		try {
			await fetchPDFFileUpload(formData);
			init();
		} catch (error) {
			console.log('asdad');
			handleErrorObject(error);
		}
		this.setState({
			isLoading: false,
		});
	}

	template() {
		const header = this.addChild(Header);
		const fileUploadContent = this.addChild(FileUploadContent);
		const modalLoadingContainer = this.addChild(Modal);
		const modalLoading = this.addChild(ModalLoading);

		return (props) => {
			if (props) this.setProps(props);

			const { isLoading } = this.state;

			const modalLoadingProps = {
				isModalShow: isLoading,
				contentComponent: modalLoading,
				width: 790,
				padding: 200,
				key: 'file-upload-loading',
			};

			const fileUploadContentProps = {
				onDrag: this.uploadFile.bind(this),
				file: this.state.file,
				onSubmit: this.submitData.bind(this),
				key: 'file-upload',
			};

			return `
        <div class="file-upload-page">
          <div class="file-upload-page__header">
            ${header.render()}
          </div>
          <div class="file-upload-page__body">
					${modalLoadingContainer.render(modalLoadingProps)}
            <div class="file-upload-page__content">
              ${fileUploadContent.render(fileUploadContentProps)}
            </div>      
          </div>
        </div>
      `;
		};
	}
}
