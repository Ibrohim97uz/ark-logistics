import authRoles from 'app/auth/authRoles';
import { lazy } from 'react';

const VacanciesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,

	routes: [
		{
			path: '/apps/vacancies',
			exact: true,
			component: lazy(() => import('./vacancies.js'))
		},
		{
			path: '/apps/vacancies/:id',
			exact: true,
			component: lazy(() => import('./singleVacancy/Vacancy'))
		}
	]
};

export default VacanciesAppConfig;
