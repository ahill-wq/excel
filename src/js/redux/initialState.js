import { clone, storage } from '../core/utilits';
import { defaultStyles, defaultTitle } from '../core/constants';

const defaultState = {
	colState: {},
	rowState: {},
	cellsText: {},
	stylesState: {},
	currentStyles: defaultStyles,
	headerTitle: defaultTitle,
	currentText: '',
	openDate: new Date().toJSON(),
};

const normalize = (state) => {
	return {
		...state,
		currentStyles: defaultStyles,
		currentText: '',
	};
};

export function normalizeInitialState(params) {
	return storage(params) ? normalize(storage(params)) : clone(defaultState);
}
