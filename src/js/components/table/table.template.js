import { modifyStyleNames, parse } from '../../core/utilits';
import { defaultStyles } from '../../core/constants';

const charCode = {
	A: 65,
	Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
	return `${state[index] || DEFAULT_WIDTH}px`;
}
function getHeight(state, index) {
	return `${state[index] || DEFAULT_HEIGHT}px`;
}

function toCol({ el, index, width }) {
	return `<div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
	${el}
	<div class="col-resize" data-resize="col"></div>
	</div>`;
}

function toChar(_, index) {
	return String.fromCharCode(charCode.A + index);
}

function createRow(state, content, index = '') {
	const height = getHeight(state, index);
	const resizeRow = index ? `<div class="row-resize" data-resize="row"></div>` : '';
	return `<div class="excel__table--row" data-type="resizable" data-row="${index}" style="height: ${height}">
							<div class="excel__table--row-info">
							${index}
							${resizeRow}
							</div>
							<div class="excel__table--row-cells">${content}</div>
  				</div>`;
}

function toCell(row, state) {
	return function (_, col) {
		const width = `width: ${getWidth(state.colState, col)}`;
		const id = `${row}:${col}`;
		const data = state.cellsText[id];
		const styles = modifyStyleNames({ ...defaultStyles, ...state.stylesState[id] });
		return `<div class="cell" 
		contenteditable 
		data-col="${col}" 
		data-row="${row}" 
		data-id="${id}" 
		data-type="cell"
		data-value="${data || ''}" 
		style="${width}; ${styles}"
		>${parse(data || '')}</div> `;
	};
}

function setWidth(state) {
	return function (el, index) {
		return {
			el,
			index,
			width: getWidth(state, index),
		};
	};
}

export default function createTable(rowsCount = 15, state) {
	const colsNumber = charCode.Z - charCode.A + 1;
	const rows = [];
	const cols = new Array(colsNumber)
		.fill('')
		.map(toChar)
		.map(setWidth(state.colState))
		.map(toCol)
		.join('');
	rows.push(createRow(state.rowState, cols));

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsNumber).fill('').map(toCell(row, state)).join('');
		rows.push(createRow(state.rowState, cells, row + 1));
	}

	return rows.join('');
}
