export const logger = (store) => (next) => (action) => {
	const prevState = store.getKeys().reduce((acc, key) => {
		return {
			...acc,
			[key]: store.getState()[key],
		};
	}, {});
	const result = next(action);
	return result;
};

export const thunk = (store) => (next) => (action) =>
	typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);
