import { storage } from '../utilits';

function toHTML(key) {
	const model = storage(key);
	const id = key.split(':')[1];
	return `
	<li class="db__list--list-item">
		<a href="#excel/${id}">${model.headerTitle}</a>
		<p>
		${new Date(model.openDate).toLocaleDateString()}
		${new Date(model.openDate).toLocaleTimeString()}
		</p>
	</li>
	`;
}

function getKeys() {
	const keys = [];

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key.includes('excel')) {
			// eslint-disable-next-line no-continue
			continue;
		}
		keys.push(key);
	}

	return keys;
}

export default function getAllRecords() {
	const keys = getKeys();
	if (!keys.length) {
		return `Вы не создали ни одной таблицы`;
	}

	return `
      <div class="db__list--header">
				<h2>Название</h2>
				<h2>Дата открытия</h2>
			</div>
			<ul class="db__list--list">
				${keys.map(toHTML).join('')}
			</ul>
  `;
}
