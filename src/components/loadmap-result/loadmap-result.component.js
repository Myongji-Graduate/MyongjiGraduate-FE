import Component from '../../core/component';
import LoadmapList from '../loadmap-list/loadmap-list.component';
import LoadmapSort from '../loadmap-sort/loadmap-sort.component';
import LoadmapImage from '../loadmap-image/loadmap-image.component';
import LoadmapMore from '../loadmap-more/loadmap-more.component';

export default class LoadmapResult extends Component {
	template() {
		const loadmapSort = this.addChild(LoadmapSort);
		const loadmapList = this.addChild(LoadmapList);
		const loadmapImage = this.addChild(LoadmapImage);
		const loadmapmore = this.addChild(LoadmapMore);
		return (props) => {
			if (props) this.setProps(props);
			const { credit, lecture, major, year } = this.props;

			return `
        <div class="loadmap-result">          
			<div class="loadmap-result__sort">${loadmapSort.render({ ...credit })}</div>
			<div class="loadmap-result-bar"></div>
			<div class="loadmap-result__list">${loadmapList.render({ lecture, year })}</div>
			<div class="loadmap-result-bar"></div>
			<div class="loadmap-result__img">${loadmapImage.render({ major })}</div>
			<div class="loadmap-result__more">${loadmapmore.render({ major })}</div>
        </div>
      `;
		};
	}
}
