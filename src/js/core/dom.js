class Dom {
	constructor(selector) {
		this.el = typeof selector === 'string' ? document.querySelector(selector) : selector;
	}

	html(html) {
		if (typeof html === 'string') {
			this.el.innerHTML = html;
			return this;
		}
		return this.el.outerHTML.trim();
	}

	text(text) {
		if (typeof text === 'string') {
			this.el.textContent = text;
			return this;
		}
		if (this.el.tagName.toLowerCase() === 'input') {
			return this.el.value;
		}
		return this.el.textContent;
	}

	attr(name, value) {
		if (value) {
			this.el.setAttribute(name, value);
			return this;
		}
		return this.el.getAttribute(name);
	}

	clear() {
		this.html('');
		return this;
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.el;
		}

		if (Element.prototype.append) {
			this.el.append(node);
		} else {
			this.el.appendChild(node);
		}

		return this;
	}

	on(eventType, callback) {
		this.el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.el.removeEventListener(eventType, callback);
	}

	getCoords() {
		return this.el.getBoundingClientRect();
	}

	get data() {
		return this.el.dataset;
	}

	matches(selector) {
		return $(this.el.matches(selector));
	}

	closest(selector) {
		return $(this.el.closest(selector));
	}

	id(parse) {
		if (parse) {
			const parsed = this.id().split(':');
			return {
				row: +parsed[0],
				col: +parsed[1],
			};
		}
		return this.data.id;
	}

	findAll(selector) {
		return this.el.querySelectorAll(selector);
	}

	find(selector) {
		return $(this.el.querySelector(selector));
	}

	css(styles = {}) {
		Object.keys(styles).forEach((key) => {
			this.el.style[key] = styles[key];
		});
	}

	addClass(className) {
		this.el.classList.add(className);
		return this;
	}

	removeClass(className) {
		this.el.classList.remove(className);
		return this;
	}

	focus(value) {
		if (value) {
			this.el.focus();
		} else {
			this.el.blur();
		}
		return this;
	}

	selectionRange() {
		const text = this.el.textContent;
		text.setSelectionRange(text.length);
	}

	getStyles(styles = []) {
		return styles.reduce((acc, curr) => {
			acc[curr] = this.el.style[curr];
			return acc;
		}, {});
	}
}

export default function $(el) {
	return new Dom(el);
}

$.createEl = (eltype, classes = '') => {
	const el = document.createElement(eltype);
	if (classes) {
		el.classList.add(classes);
	}
	return $(el);
};
