import authRoles from 'app/auth/authRoles.js';
import { lazy } from 'react';

const CertificatesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/apps/certificate',
			exact: true,
			component: lazy(() => import('./Certificates.js'))
		},
		{
			path: '/apps/certificate/:id',
			exact: true,
			component: lazy(() => import('./singleCertificate/CertificatePage'))
		}
	]
};

export default CertificatesAppConfig;
