import authRoles from 'app/auth/authRoles.js';
import { lazy } from 'react';

const ServicesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,

	routes: [
		{
			path: '/apps/news',
			exact: true,
			component: lazy(() => import('./News.js'))
		},
		{
			path: '/apps/news/:id',
			exact: true,
			component: lazy(() => import('./singleNews/NewsPage'))
		}
	]
};

export default ServicesAppConfig;
