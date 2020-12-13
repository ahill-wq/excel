import $ from '../../core/dom';
import Emitter from '../../core/Emitter';
import StoreSubscribers from '../../core/StoreSubscribers';
import { preventDefault } from '../../core/utilits';
import { updateDate } from '../../redux/actions';

export default class Excel {
	constructor(options) {
		this.components = options.components || [];
		this.store = options.store;
		this.emitter = new Emitter();
		this.storeSubscribers = new StoreSubscribers(this.store);
	}

	getRoot() {
		const $root = $.createEl('div', 'excel');

		const componentOptions = {
			emitter: this.emitter,
			store: this.store,
		};

		this.components = this.components.map((Component) => {
			const $cRoot = $.createEl('div', Component.className);
			const component = new Component($cRoot, componentOptions);
			$cRoot.html(component.toHTML());
			$root.append($cRoot);
			return component;
		});

		return $root;
	}

	init() {
		if (process.env.NODE_ENV === 'production') {
			document.addEventListener('contextmenu', preventDefault);
		}
		this.store.dispatch(updateDate());
		this.storeSubscribers.subscribeComponents(this.components);
		this.components.forEach((component) => {
			component.init();
		});
	}

	destroy() {
		this.storeSubscribers.unsubscribeFromStore();
		this.components.forEach((component) => component.destroy());
		document.removeEventListener('contextmenu', preventDefault);
	}
}
