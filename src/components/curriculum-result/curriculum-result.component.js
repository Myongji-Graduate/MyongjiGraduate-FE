import Component from '../../core/component';
import CurriculumList from '../curriculum-list/curriculum-list.component';
import CurriculumSort from '../curriculum-sort/curriculum-sort.component';
import CurriculumImage from '../curriculum-image/curriculum-image.component';
import CurriculumMore from '../curriculum-more/curriculum-more.component';

export default class LoadmapResult extends Component {
	template() {
		const curriculumSort = this.addChild(CurriculumSort);
		const curriculumList = this.addChild(CurriculumList);
		const curriculumImage = this.addChild(CurriculumImage);
		const curriculumMore = this.addChild(CurriculumMore);
		return (props) => {
			if (props) this.setProps(props);
			const { credit, lecture, major, year } = this.props;

			return `
        <div class="curriculum-result">          
			<div class="curriculum-result__sort">${curriculumSort.render({ ...credit })}</div>
			<div class="curriculum-result-bar"></div>
			<div class="curriculum-result__list">${curriculumList.render({ lecture, year })}</div>
			<div class="curriculum-result-bar"></div>
			<div class="curriculum-result__img">${curriculumImage.render({ major })}</div>
			<div class="curriculum-result__more">${curriculumMore.render({ major })}</div>
        </div>
      `;
		};
	}
}
