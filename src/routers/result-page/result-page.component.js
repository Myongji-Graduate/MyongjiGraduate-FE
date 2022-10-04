import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';
import Modal from '../../components/modal/modal.component';
import ModalHackmunguicho from '../../components/modal-hackmunguicho/modal-hackmunguicho.component';
import CategoryCard from '../../components/category-card/category-card.component';

import informationBackgroundImage from '../../../public/images/sub-background.png'
import backgroundBottomImage from '../../../public/images/header-bottom.png';

export default class ResultPage extends Component {
	initState() {
		this.state = {
			isModalShow: false,
		};
	}

	toggleModal() {
		this.setState({
			// isModalShow: !this.state.isModalShow,
		});
	}

	template() {
		const gnb = this.addChild(GNB);
		const modal = this.addChild(Modal);
		const hackmunguicho = this.addChild(ModalHackmunguicho);
		const categoryCard = this.addChild(CategoryCard);
		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="result-page">
					${modal.render({
						isModalShow: this.state.isModalShow,
						toggleModal: this.toggleModal.bind(this),
						contentComponent: hackmunguicho,
						width: 1480,
						padding: 90,
					})}
					<div class="result-page__header">
            ${gnb.render()}
            <img src=${informationBackgroundImage} class="result-page__background-img" />
            <img src=${backgroundBottomImage} class="result-page__bottom-img" />
          </div>
					<div class="result-page__body">
						<div class="result-page__content">
							<div class="result-page__summary"></div>
							<div class="result-page__category-grid-container">
								${categoryCard.render()}
								${categoryCard.render()}
								${categoryCard.render()}
								${categoryCard.render()}
							</div>
						</div>
					</div>
				</div>
					`;
				};
			}
		}
		

		