export default class TableSelection {
	static className = 'selected';

	constructor() {
		this.group = [];
		this.current = null;
	}

	get selectedIds() {
		return this.group.map(($el) => $el.id());
	}

	select($el) {
		this.clear();
		this.group.push($el);
		this.current = $el;
		$el.focus(true).addClass(TableSelection.className);
	}

	clear() {
		this.group.forEach((el) => el.removeClass(TableSelection.className));
		this.group = [];
	}

	selectGroup($group) {
		this.clear();
		this.group = $group;
		$group.forEach((el) => el.addClass(TableSelection.className));
	}

	applyStyles(styles) {
		this.group.forEach(($el) => {
			$el.css(styles);
		});
	}
}
