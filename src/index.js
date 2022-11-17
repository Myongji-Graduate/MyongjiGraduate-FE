import './root.scss';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import * as dom from './core/dom';

import { browserRouter } from './routers';

const firebaseConfig = {
	apiKey: FIREBASE_KEY,
	authDomain: 'mju-graduate.firebaseapp.com',
	projectId: 'mju-graduate',
	storageBucket: 'mju-graduate.appspot.com',
	messagingSenderId: '926645392534',
	appId: '1:926645392534:web:3fdb699b634ee68f72deb7',
	measurementId: 'G-BXW31GJDJB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

async function createApp() {
	dom.createDom('.app-container', await browserRouter.browserRender());
}

createApp();
