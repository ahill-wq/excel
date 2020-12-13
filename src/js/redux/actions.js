import {
	TABLE_RESIZE,
	CHANGE_TEXT,
	CHANGE_STYLES,
	APPLY_STYLES,
	HEADER_TITLE,
	UPDATE_DATE,
} from './types';

export function tableResize(payload) {
	return {
		type: TABLE_RESIZE,
		payload,
	};
}

export function changeText(payload) {
	return {
		type: CHANGE_TEXT,
		payload,
	};
}

export function changeStyles(payload) {
	return {
		type: CHANGE_STYLES,
		payload,
	};
}

export function applyStyles(payload) {
	return {
		type: APPLY_STYLES,
		payload,
	};
}

export function headerTitle(payload) {
	return {
		type: HEADER_TITLE,
		payload,
	};
}

export function updateDate() {
	return {
		type: UPDATE_DATE,
	};
}
