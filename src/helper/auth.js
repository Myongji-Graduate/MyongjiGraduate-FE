import { store } from '../store/store';

export function signIn() {
	sessionStorage.setItem('isLogin', true);
}

export async function signOut() {
	try {
		await fetch('/api/signout');
		sessionStorage.setItem('isLogin', false);
		const { router } = store.getState();
		router.navigate('/sign-in');
	} catch (err) {
		console.log(err);
	}
}

export function init() {
	sessionStorage.setItem('isInit', true);
}

export function unInit() {
	sessionStorage.setItem('isInit', false);
}

export function checkIsSignIn() {
	if (typeof window === 'undefined') return false;
	const isLogin = sessionStorage.getItem('isLogin');
	if (isLogin === null || isLogin === 'false') return false;
	return true;
}

export function checkIsInit() {
	if (typeof window === 'undefined') return false;
	const isInit = sessionStorage.getItem('isInit');
	if (isInit === null || isInit === 'false') return false;
	return true;
}

export function redirectSignInPage() {
	const { router } = store.getState();
	router.navigate('/sign-in');
}
