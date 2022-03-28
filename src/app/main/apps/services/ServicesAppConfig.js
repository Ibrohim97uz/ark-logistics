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
			path: '/apps/services',
			exact: true,
			component: lazy(() => import('./Services.js'))
		},
		{
			path: '/apps/services/:id',
			exact: true,
			component: lazy(() => import('./singleService/ServicePage'))
		}
	]
};

export default ServicesAppConfig;
