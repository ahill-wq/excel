import $ from '../dom';
import getAllRecords from './dashboard.functions';
import Page from './Page';

export default class DashboardPage extends Page {
	getRoot() {
		const param = Date.now().toString();
		return $.createEl('div', 'db').html(`
		<div class="db__header">
		<h1>Excel Dashboard</h1>
	</div>
	<div class="db__new">
		<div class="db__view">
			<a href="#excel/${param}" class="db__new--link">Новая Таблица</a>
		</div>
	</div>
	<div class="db__list">
		<div class="db__view">
			${getAllRecords()}
		</div>
	</div>`);
	}
}
