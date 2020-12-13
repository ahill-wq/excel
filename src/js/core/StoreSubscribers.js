import { isEqual } from './utilits';

export default class StoreSubscribers {
	constructor(store) {
		this.store = store;
		this.sub = null;
		this.prevState = {};
	}

	subscribeComponents(components) {
		this.prevState = this.store.getState();

		this.sub = this.store.subscribe((state) => {
			Object.keys(state).forEach((key) => {
				if (!isEqual(state[key], this.prevState[key])) {
					components.forEach((component) => {
						if (component.subscriptions.includes(key)) {
							const changes = { [key]: state[key] };
							component.stateChange(changes);
						}
					});
				}
			});

			this.prevState = this.store.getState();
		});
	}

	unsubscribeFromStore() {
		this.sub.unsubscribe();
	}
}
