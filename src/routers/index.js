import MainPage from './main-page/main-page.component';
import TutorialPage from './tutorial-page/tutorial-page.component';

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
		],
	},
];

export const router = new Router(routerObjects);
