import Component from '../../core/component';

import Header from '../../components/header/header.component';
import FileUploadContent from '../../components/file-upload-content/file-upload-content.component';
import { fetchResult } from '../../store/async-action';
import { store } from '../../store/store';

export default class FileUploadPage extends Component {
	initState() {
		this.state = {
			file: undefined,
		};
	}

	uploadFile(file) {
		this.setState({
			file,
		});
	}

	submitData() {
		const formData = new FormData();

		formData.append('file', this.state.file, 'grade.pdf');

		store.dispatch(fetchResult(formData));
	}

	template() {
		const header = this.addChild(Header);
		const fileUploadContent = this.addChild(FileUploadContent);

		return (props) => {
			if (props) this.setProps(props);

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
            <div class="file-upload-page__content">
              ${fileUploadContent.render(fileUploadContentProps)}
            </div>      
          </div>
        </div>
      `;
		};
	}
}
