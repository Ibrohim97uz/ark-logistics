import authRoles from 'app/auth/authRoles.js';
import { lazy } from 'react';

const StaffsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,

	routes: [
		{
			path: '/apps/staffs',
			exact: true,
			component: lazy(() => import('./staffs.js'))
		},
		{
			path: '/apps/staffs/:id',
			exact: true,
			component: lazy(() => import('./singleStaff/ProfilePage'))
		}
	]
};

export default StaffsAppConfig;
