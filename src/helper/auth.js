import { store } from '../store/store';

export function signIn() {
	localStorage.setItem('isLogin', true);
}

export function redirectSignInPage() {
	const { router } = store.getState();
	router.navigate('/sign-in');
}

export function redirectMypage() {
	const { router } = store.getState();
	router.navigate('/mypage');
}

export async function signOut() {
	try {
		await fetch('/api/signout');
		localStorage.setItem('isLogin', false);
		redirectSignInPage();
	} catch (err) {
		console.log(err);
	}
}

export function init() {
	localStorage.setItem('isInit', true);
}

export function unInit() {
	localStorage.setItem('isInit', false);
}

export function checkIsSignIn() {
	if (typeof window === 'undefined') return false;
	const isLogin = localStorage.getItem('isLogin');
	if (isLogin === null || isLogin === 'false') return false;
	return true;
}

export function checkIsInit() {
	if (typeof window === 'undefined') return false;
	const isInit = localStorage.getItem('isInit');
	if (isInit === null || isInit === 'false') return false;
	return true;
}
