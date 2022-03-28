import { TableCell, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const TableHeader = props => {
	const { t } = useTranslation();
	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell className="p-4 md:p-16 text-center">№</TableCell>
				<TableCell className="p-4 md:p-16">{t('Full Name')}</TableCell>
				<TableCell className="p-4 md:p-16">{t('Email')}</TableCell>
				<TableCell className="p-4 md:p-16">{t('Phone number')}</TableCell>
				<TableCell className="p-4 md:p-16 text-center">{t('Vacancy')}</TableCell>
				<TableCell className="p-4 md:p-16 text-center">{t('File')}</TableCell>
				<TableCell className="p-4 md:p-16 text-center">{t('Created in')}</TableCell>
				<TableCell className="p-4 md:p-16 text-center">{t('Operation')}</TableCell>
			</TableRow>
		</TableHead>
	);
};
export default TableHeader;
