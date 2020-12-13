import { capitalize } from './utilits';

export default class DOMListeners {
	constructor($root, listeners) {
		if (!$root) {
			throw new Error(`No $root provided for DOMListener`);
		}
		this.$root = $root;
		this.listeners = listeners || [];
	}

	initDomListener() {
		this.listeners.forEach((element) => {
			const method = fixMethodName(element);
			if (!this[method]) {
				throw new Error(`Method ${method} is not implemented in ${this.name} Component`);
			}

			this[method] = this[method].bind(this);
			this.$root.on(element, this[method]);
		});
	}

	removeDomListener() {
		this.listeners.forEach((element) => {
			const method = fixMethodName(element);
			this.$root.off(element, this[method]);
		});
	}
}

function fixMethodName(name) {
	return `on${capitalize(name)}`;
}
