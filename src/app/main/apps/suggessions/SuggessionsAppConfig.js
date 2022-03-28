import { authRoles } from 'app/auth';
import { lazy } from 'react';

const SuggessionsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,

	routes: [
		{
			path: '/apps/suggessionsAndQuestions',
			component: lazy(() => import('./suggessions'))
		}
	]
};

export default SuggessionsAppConfig;
