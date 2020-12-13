import '../scss/styles.scss';
import DashboardPage from './core/pages/DashboardPage';
import ExcelPage from './core/pages/ExcelPage';
import Router from './core/router/Router';

new Router('#app', {
	Dashboard: DashboardPage,
	Excel: ExcelPage,
});
