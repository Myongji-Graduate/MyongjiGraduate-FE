import MainPage from './main-page/main-page.component';
import TutorialPage from './tutorial-page/tutorial-page.component';
import ResultPage from './result-page/result-page.component';
import SignInPage from './sign-in-page/sign-in-page.component';
import SignUpPage from './sign-up-page/sign-up-page.component';
import FileUploadPage from './file-upload-page/file-upload-page.component';

import Router from '../core/router';
import App from '../app';

export const routerObjects = [
	{
		path: '/',
		element: MainPage,
		children: [
			{
				path: 'result',
				element: ResultPage,
			},
			{
				path: 'tutorial',
				element: TutorialPage,
			},
			{
				path: 'sign-up',
				element: SignUpPage,
			},
			{
				path: 'sign-in',
				element: SignInPage,
			},
			{
				path: 'file-upload',
				element: FileUploadPage,
			},
		],
	},
];

const app = new App();

export const router = new Router(routerObjects, app);
