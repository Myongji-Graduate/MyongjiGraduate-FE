import Component from '../../core/component';

export default class ImgExplain extends Component {
	setDefaultProps() {
		this.props = {
			img: 'url',
			title: '제목',
			expalin: '설명',
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { img, title, explain } = this.props;
			return `
       <div class="img-explain">
			<div class="img-explain__img"><img src=${img}/></div>
            <div class="img-explain__title">${title}</div>
			<div class="img-explain__explain">${explain}</div>           
       </div>
      `;
		};
	}
}
