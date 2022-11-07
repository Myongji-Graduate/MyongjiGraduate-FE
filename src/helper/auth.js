import { store } from '../store/store';

export function signIn() {
	sessionStorage.setItem('isLogin', true);
}

export async function signOut() {
	try {
		await fetch('/api/signout')
		sessionStorage.setItem('isLogin', false);
		const { router } = store.getState();
		router.navigate('/sign-in');
	} catch (err) {
		console.log(err)
	}

}

export function checkIsSignIn() {
	if (typeof window === 'undefined') return false;
	const isLogin = sessionStorage.getItem('isLogin');
	if (isLogin === null || isLogin === 'false') return false;
	return true;
}

export function redirectSignInPage() {
	const { router } = store.getState();
	router.navigate('/sign-in');
}
