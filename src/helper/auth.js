import { store } from '../store/store';

export function signIn() {
	sessionStorage.setItem('isLogin', true);
}

export function signOut() {
	sessionStorage.setItem('isLogin', false);
}

export function checkIsSignIn() {
	const isLogin = sessionStorage.getItem('isLogin');
	if (isLogin === null || isLogin === false) return false;
	return true;
}

export function redirectSignInPage() {
	const { router } = store.getState();
	router.navigate('/sign-in');
}
