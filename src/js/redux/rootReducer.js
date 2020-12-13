import {
	TABLE_RESIZE,
	CHANGE_TEXT,
	CHANGE_STYLES,
	APPLY_STYLES,
	HEADER_TITLE,
	UPDATE_DATE,
} from './types';

function value(state, field, action) {
	const val = state[field] || {};
	val[action.payload.id] = action.payload.value;
	return val;
}
export default function rootReducer(state, action) {
	let field;
	let val;
	switch (action.type) {
		case TABLE_RESIZE:
			field = action.payload.type === 'col' ? 'colState' : 'rowState';
			return { ...state, [field]: value(state, field, action) };
		case CHANGE_TEXT:
			field = 'cellsText';
			return {
				...state,
				[field]: value(state, field, action),
				currentText: action.payload.value,
			};
		case CHANGE_STYLES:
			field = 'currentStyles';
			return { ...state, [field]: action.payload };
		case HEADER_TITLE:
			field = 'headerTitle';
			return { ...state, [field]: action.payload };
		case UPDATE_DATE:
			return { ...state, openDate: new Date().toJSON() };
		case APPLY_STYLES:
			field = 'stylesState';
			val = state[field] || {};
			action.payload.ids.forEach((id) => {
				val[id] = { ...val[id], ...action.payload.value };
			});
			return {
				...state,
				[field]: val,
				currentStyles: { ...state.currentStyles, ...action.payload.value },
			};
		default:
			return state;
	}
}
