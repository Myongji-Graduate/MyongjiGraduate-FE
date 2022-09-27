import { updateDom } from './dom';

let currentSubscriber = null;

export const subscribe = (observer) => {
	currentSubscriber = observer;
};

export const unlockSubscribe = () => {
	currentSubscriber = null;
};

export const observable = (obj) => {
	Object.keys(obj).forEach((key) => {
		let curValue = obj[key];
		const subscribers = new Set();

		Object.defineProperty(obj, key, {
			get() {
				// observer 등록
				if (currentSubscriber !== null) subscribers.add(currentSubscriber);
				return curValue;
			},
			set(newValue) {
				curValue = newValue;
				subscribers.forEach((subscriber) => updateDom(subscriber));
			},
		});
	});
	return obj;
};
