export default class ActiveRoute {
	static get path() {
		return window.location.hash.slice(1);
	}

	static get param() {
		return this.path.split('/')[1];
	}

	static deletePage() {
		const pageStateKey = `excel:${this.param}`;
		localStorage.removeItem(pageStateKey);
	}

	static navigate(path) {
		window.location.hash = path;
	}
}
