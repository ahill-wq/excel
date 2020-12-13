import ExcelComponents from './ExcelComponents';

export default class ExcelStateComponent extends ExcelComponents {
	get template() {
		return '';
	}

	initState(initialState = {}) {
		this.state = { ...initialState };
	}

	setState(newState) {
		this.state = { ...this.state, ...newState };
		this.$root.html(this.template);
	}
}
