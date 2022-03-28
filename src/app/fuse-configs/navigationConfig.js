import { authRoles } from 'app/auth';
import i18next from 'i18next';
import { Translation } from 'react-i18next';

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'suggessions',
				title: <Translation>{t => t('Suggessions And Questions')}</Translation>,
				type: 'item',
				icon: 'question_answer',
				url: '/apps/suggessionsAndQuestions',
				auth: authRoles.user
			},
			{
				id: 'staffs',
				title: <Translation>{t => t('Staffs')}</Translation>,
				type: 'item',
				icon: 'person',
				url: '/apps/staffs',
				auth: authRoles.user
			},
			{
				id: 'resume',
				title: <Translation>{t => t('Resume')}</Translation>,
				type: 'item',
				icon: 'contact_page',
				url: '/apps/resumes',
				auth: authRoles.admin
			},
			{
				id: 'vacancies',
				title: <Translation>{t => t('Vacancies')}</Translation>,
				type: 'item',
				icon: 'supervisor_account',
				url: '/apps/vacancies',
				auth: authRoles.user
			},
			{
				id: 'gallery',
				title: <Translation>{t => t('Galleries')}</Translation>,
				type: 'item',
				icon: 'collections',
				url: '/apps/gallery',
				auth: authRoles.user
			},
			{
				id: 'services',
				title: <Translation>{t => t('Services')}</Translation>,
				type: 'item',
				icon: 'miscellaneous_services',
				url: '/apps/services',
				auth: authRoles.user
			},
			{
				id: 'news',
				title: <Translation>{t => t('News')}</Translation>,
				type: 'item',
				icon: 'new_releases',
				url: '/apps/news',
				auth: authRoles.user
			},
			{
				id: 'certificates',
				title: <Translation>{t => t('Certificates')}</Translation>,
				type: 'item',
				icon: 'receipt_long',
				url: '/apps/certificate',
				auth: authRoles.user
			}
		]
	}
];

export default navigationConfig;
