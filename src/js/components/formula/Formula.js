import ExcelComponents from '../../core/ExcelComponents';
import $ from '../../core/dom';

export default class Formula extends ExcelComponents {
	static className = 'excel__formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscriptions: ['currentText'],
			...options,
		});
	}

	init() {
		super.init();
		this.$input = this.$root.find('#input');
		this.$on('table:select', (el) => this.$input.text(el.data.value));
	}

	toHTML() {
		return `<span class="excel__formula--icon">fx</span>
		<div id='input' class="excel__formula--input" contenteditable="true" spellcheck="false"></div>`;
	}

	onInput(event) {
		this.$emit('formula:input', $(event.target).text());
	}

	stateChange(state) {
		this.$input.text(state.currentText);
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab'];
		if (keys.includes(event.key)) {
			event.preventDefault();
			this.$emit('formula:enter');
		}
	}
}
