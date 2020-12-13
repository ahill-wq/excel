export default class Emitter {
	constructor() {
		this.listeners = {};
	}

	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(fn);
		return () => {
			this.listeners[event] = this.listeners[event].filter((el) => el !== fn);
		};
	}

	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) {
			return false;
		}
		this.listeners[event].forEach((fn) => fn(...args));
		return true;
	}
}
