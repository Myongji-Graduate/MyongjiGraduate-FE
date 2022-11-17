import Component from '../../core/component';
import { checkIsSignIn } from '../../helper/auth';
import { getResponseiveImage } from '../../helper/images';
import { fetchGetMyInfo } from '../../async/info';
import Info from '../info/info.component';

const sizes = {
	mobile: 80,
	tablet: 100,
	sm: 100,
	md: 130,
	lg: 172,
};
const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/profile-image.png`);

export default class MyInfo extends Component {
	initState() {
		this.state = {
			studentNumber: 'studnetId',
			studentName: 'name',
			department: 'department',
		};
	}

	async fetchMyInfo() {
		try {
			const result = await fetchGetMyInfo();
			this.setState({
				studentNumber: result.studentNumber,
				studentName: result.studentName,
				department: result.department,
				isLoading: false,
			});
		} catch (error) {}
	}

	componentDidMount() {
		if (checkIsSignIn()) {
			this.fetchMyInfo();
		}
	}

	template() {
		const info = this.addChild(Info);
		return (props) => {
			if (props) this.setProps(props);

			const { studentNumber, studentName, department } = this.state;
			const { key } = this.props;

			return `
       <div class="my-info__${key} my-info">       
            <img sizes="${sizeAttr}" srcset="${srcsetAttr}" class="my-info-img" alt="my-info-img" />
                  
            ${
							checkIsSignIn()
								? info.render({
										studentName,
										studentNumber,
										department,
										exist: true,
								  })
								: info.render({
										studentName: 'GUEST',
										studentNumber: '',
										department: '로그인이 필요합니다.',
										exist: false,
								  })
						}
        </div>
      `;
		};
	}
}
