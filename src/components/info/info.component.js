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
			const { studentName, studentNumber, exist } = this.props;
			const major = { primaryMajor: '응용소프트웨어전공', doulbeMajor: '법학과', subMajor: '경영학과' };

			return `							
        <div class="my-info-text">	   
            <div class="my-info-text__name">
                <div class="my-info-text__name-data">${studentName}</div>
                <div class="my-info-text__name-suffix">${exist ? '님' : ''}</div>
            </div>
				${major.primaryMajor && `<div class="my-info-text__major">${major.primaryMajor}</div>`}
				${major.doulbeMajor && `<div class="my-info-text__major">${major.doulbeMajor}</div>`}
				${major.subMajor && `<div class="my-info-text__major">${major.subMajor}</div>`}
                <div class="my-info-text__studentId">${studentNumber}</div>
        </div>
      `;
		};
	}
}
