import MainPage from './main-page/main-page.component';
import TutorialPage from './tutorial-page/tutorial-page.component';
import ResultPage from './result-page/result-page.component';
import SignInPage from './sign-in-page/sign-in-page.component';
import SignUpPage from './sign-up-page/sign-up-page.component';
import FileUploadPage from './file-upload-page/file-upload-page.component';
import MypagePage from './mypage-page/mypage-page.component';

import App from '../app';
import BrowserRouter from '../core/browser-router';
import ServerRouter from '../core/server-router';

export const routerObjects = [
	{
		path: '/',
		element: MainPage,
		children: [
			{
				path: 'result',
				element: ResultPage,
				authentication: true,
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
				authentication: true,
			},
			{
				path: 'mypage',
				element: MypagePage,
				authentication: true,
			},
		],
	},
];

const app = new App();

export const browserRouter = new BrowserRouter(routerObjects, app);
export const serverRouter = new ServerRouter(routerObjects, app);
