/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import ExcelStateComponent from '../../core/ExcelStateComponent';
import $ from '../../core/dom';
import * as actions from '../../redux/actions';
import { defaultTitle } from '../../core/constants';
import ActiveRoute from '../../core/router/ActiveRoute';

export default class Header extends ExcelStateComponent {
	static className = 'excel__header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options,
		});
	}

	toHTML() {
		const title = this.store.getState().headerTitle || defaultTitle;
		return `<input type="text" value="${title}" placeholder="Название файла" class="excel__header--input" />
		<div class="excel__header--buttons">
			
				<span class="material-icons" data-button="delete">
					delete
				</span>
			
			
				<span class="material-icons" data-button="exit">
					exit_to_app
				</span>
			
		</div>`;
	}

	onInput(event) {
		this.$dispatch(actions.headerTitle($(event.target).text()));
	}

	onClick(event) {
		const $target = $(event.target);
		if ($target.data.button === 'delete') {
			const decision = confirm('Вы действительно хотите удалить данную таблицу?');
			if (decision) {
				ActiveRoute.deletePage();
				ActiveRoute.navigate('');
			}
		}
		if ($target.data.button === 'exit') {
			ActiveRoute.navigate('');
		}
	}
}
