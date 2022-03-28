import { authRoles } from 'app/auth';
import { lazy } from 'react';

const ResumesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,

	routes: [
		{
			path: '/apps/resumes',
			component: lazy(() => import('./resumes'))
		}
	]
};

export default ResumesAppConfig;
