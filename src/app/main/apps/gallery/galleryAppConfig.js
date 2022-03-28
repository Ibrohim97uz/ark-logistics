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
			path: '/apps/gallery',
			exact: true,
			component: lazy(() => import('./Gallery.js'))
		},
		{
			path: '/apps/gallery/:id',
			exact: true,
			component: lazy(() => import('./singleGallery/GalleryPage'))
		}
	]
};

export default StaffsAppConfig;
