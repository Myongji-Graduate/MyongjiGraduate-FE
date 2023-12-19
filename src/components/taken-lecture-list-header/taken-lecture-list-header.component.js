import Component from '../../core/component';

import Modal from '../modal/modal.component';
import CategoryInfo from '../category-info/category-info.component';
import Button from '../button/button.component';
import { buttonTypes } from '../../helper/types';
import { store } from '../../store/store';
import Custom from '../custom/custom.component';

export default class TakenLectureListHeader extends Component {
	initState() {
		this.state = {
			isCustomModal: false,
		};
	}

	setDefaultProps() {
		this.props = {
			isEditableMode: true,
			toggleEditableMode: () => {},
			clearEditedLecture: () => {},
			submitEditedLecture: () => {},
		};
	}

	customModal() {
		this.setState({
			isCustomModal: !this.state.isCustomModal,
		});
	}

	template() {
		const tableInfo = this.addChild(CategoryInfo);
		const customButton = this.addChild(Button);
		const uploadNavigationButton = this.addChild(Button);
		const clearEditedLectureButton = this.addChild(Button);
		const saveEditedLectureButton = this.addChild(Button);

		const modalCustomContainer = this.addChild(Modal);
		const custom = this.addChild(Custom);

		return (props) => {
			if (props) this.setProps(props);

			const { isEditableMode, toggleEditableMode, clearEditedLecture, submitEditedLecture } = this.props;

			const modalContentClickHandler = () => {
				toggleEditableMode();
				this.customModal();
			};

			const modalCustomProps = {
				isModalShow: this.state.isCustomModal,
				toggleModal: this.customModal.bind(this),
				contentComponent: custom,
				contentComponentProps: {
					onClick: modalContentClickHandler,
				},
				width: 1220,
				padding: 100,
				key: 'custom',
			};

			const customButtonProps = {
				content: '커스텀하기',
				type: buttonTypes.grey,
				size: 'xs',
				key: 'custom-button',
				onClick: this.customModal.bind(this),
			};

			const uploadButtonOnClick = () => {
				const { router } = store.getState();
				router.navigate('/file-upload');
			};

			const clearEditedLectureButtonProps = {
				content: '취소하기',
				type: buttonTypes.grey,
				size: 'xs',
				key: 'clear-lecture-button',
				onClick: clearEditedLecture,
			};

			const saveEditedLectureButtonProps = {
				content: '저장하기',
				type: buttonTypes.primary,
				size: 'xs',
				key: 'save-lecture-button',
				onClick: submitEditedLecture,
			};

			const uploadNavigationButtonProps = {
				content: '업로드',
				type: buttonTypes.grey,
				size: 'xs',
				key: 'upload-navigation-button',
				onClick: uploadButtonOnClick,
			};

			return `
      <div class="taken-lecture-list-header">
			 ${modalCustomContainer.render(modalCustomProps)}
          <div class="taken-lecture-list-header__header">
            ${tableInfo.render({ categoryName: '내 기이수 과목' })}
            <div class="taken-lecture-list-header__header-button-container">
            ${
							isEditableMode
								? `
                ${saveEditedLectureButton.render(saveEditedLectureButtonProps)}
                <div class="taken-lecture-list-header__divider"></div>
                ${clearEditedLectureButton.render(clearEditedLectureButtonProps)}
                `
								: `${customButton.render(customButtonProps)}
				<div class="taken-lecture-list-header__divider"></div>
				${uploadNavigationButton.render(uploadNavigationButtonProps)}
				`
						}
            </div>
          </div>
        </div>
      `;
		};
	}
}
