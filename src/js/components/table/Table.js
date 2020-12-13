import ExcelComponents from '../../core/ExcelComponents';
import createTable from './table.template';
import resizeHandler from './table.rezise';
import { shouldResize, isCell, matrix, nextSelection } from './table.functions';
import TableSelection from './TableSelection';
import * as actions from '../../redux/actions';
import $ from '../../core/dom';
import { defaultStyles } from '../../core/constants';
import { parse } from '../../core/utilits';

export default class Table extends ExcelComponents {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		});
	}

	toHTML() {
		return createTable(20, this.store.getState());
	}

	prepare() {
		this.selection = new TableSelection();
	}

	updateTextInStore(value) {
		this.$dispatch(
			actions.changeText({
				id: this.selection.current.id(),
				value,
			}),
		);
	}

	init() {
		super.init();
		this.selectCell(this.$root.find('[data-id="0:0"]'));
		this.$on('formula:input', (text) => {
			this.selection.current.attr('data-value', text).text(parse(text));
			this.updateTextInStore(text);
		});
		this.$on('formula:enter', () => this.selection.current.focus(true));

		this.$on('toolbar:applyStyle', (value) => {
			this.selection.applyStyles(value);
			this.$dispatch(
				actions.applyStyles({
					ids: this.selection.selectedIds,
					value,
				}),
			);
		});
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit('table:select', $cell);

		const styles = $cell.getStyles(Object.keys(defaultStyles));
		this.$dispatch(actions.changeStyles(styles));
	}

	async resizeTable(event) {
		try {
			const data = await resizeHandler(this.$root, event);
			this.$dispatch(actions.tableResize(data));
		} catch (err) {
			console.warn(err);
		}
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event);
		} else if (isCell(event)) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const ids = matrix($target, this.selection.current).map((id) =>
					this.$root.find(`[data-id="${id}"]`),
				);
				this.selection.selectGroup(ids);
			} else {
				this.selectCell($target);
			}
		}
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
		const { key } = event;

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();
			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelection(key, id));
			this.selectCell($next);
		}
	}

	onInput(event) {
		const text = $(event.target).text();
		this.selection.current.attr('data-value', text);

		this.updateTextInStore(text);
	}
}
