import MainPage from './main-page/main-page.component';
import TutorialPage from './tutorial-page/tutorial-page.component';
import ResultPage from './result-page/result-page.component';

import Router from '../core/router';

export const routerObjects = [
	{
		path: '/',
		element: MainPage,
		children: [
			{
				path: 'product',
				element: TutorialPage,
			},
			{
				path: 'result',
				element: ResultPage,
			},
		],
	},
];

export const router = new Router(routerObjects);
