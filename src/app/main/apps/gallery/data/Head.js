import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Head = ({ alertOpen, setAlertOpen, addNewOpen, setAddNewOpen }) => {
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
						{t('Gallery')}
					</Typography>
				</div>
				<Typography variant="h6" className="text-18 sm:text-24 font-semibold">
					{t('Gallery')}
				</Typography>
			</div>
			{!addNewOpen && (
				<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
					<Button
						className="whitespace-nowrap"
						variant="contained"
						color="secondary"
						onClick={() => setAddNewOpen(true)}
					>
						<span className="hidden sm:flex">{t('Add new')}</span>
					</Button>
				</motion.div>
			)}
		</div>
	);
};
export default Head;
