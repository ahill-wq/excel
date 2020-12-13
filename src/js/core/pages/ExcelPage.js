import Page from './Page';
import Excel from '../../components/excel/Excel';
import Header from '../../components/header/Header';
import Toolbar from '../../components/toolbar/Toolbar';
import Formula from '../../components/formula/Formula';
import Table from '../../components/table/Table';
import createStore from '../store/createStore';
import rootReducer from '../../redux/rootReducer';
import { storage, debounce } from '../utilits';
import { normalizeInitialState } from '../../redux/initialState';

function storageName(params) {
	return `excel:${params}`;
}

export default class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString();
		const initialState = normalizeInitialState(storageName(params));

		const store = createStore(rootReducer, initialState);
		const stateListener = debounce((state) => {
			storage(storageName(params), state);
		}, 300);

		store.subscribe(stateListener);

		this.excel = new Excel({
			components: [Header, Toolbar, Formula, Table],
			store,
		});

		return this.excel.getRoot();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
	}
}
