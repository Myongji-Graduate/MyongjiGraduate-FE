import Component from '../../core/component';

export default class Info extends Component {
	setDefaultProps() {
		this.props = {
			studentName: '',
			major: '',
			studentNumber: '',
			exist: false,
		};
	}

	template() {
		return (props) => {
			if (props) this.setProps(props);
			const { studentName, major, studentNumber, exist } = this.props;

			return `							
        <div class="my-info-text">	   
            <div class="my-info-text__name">
                <div class="my-info-text__name-data">${studentName}</div>
                <div class="my-info-text__name-suffix">${exist ? '님' : ''}</div>
            </div>
                <div class="my-info-text__major">${major}</div>
                <div class="my-info-text__studentId">${studentNumber}</div>
        </div>
      `;
		};
	}
}
