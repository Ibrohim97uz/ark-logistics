import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Head = ({ selectedTab, setSelectedTab }) => {
	const { t } = useTranslation();
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col w-full sm:w-auto">
				<div className="flex items-center mb-4">
					<Icon className="text-18" color="action">
						home
					</Icon>
					<Icon className="text-16" color="action">
						chevron_right
					</Icon>
					<Typography color="textSecondary" className="font-medium">
						{t('Vacancies')}
					</Typography>
				</div>
				<Typography variant="h6" className="text-18 sm:text-24 font-semibold">
					{t('Vacancies')}
				</Typography>
			</div>

			<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
				<Button
					className="whitespace-nowrap"
					variant="contained"
					color="secondary"
					onClick={() => {
						selectedTab === 1 && setSelectedTab(0);
						selectedTab === 0 && setSelectedTab(1);
					}}
				>
					<span className="hidden sm:flex">{selectedTab === 0 ? t('Edit Vacancy') : t('Cancel')}</span>
				</Button>
			</motion.div>
		</div>
	);
};
export default Head;
