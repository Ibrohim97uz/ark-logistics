import { TableCell, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
const TableHeader = props => {
	const { t } = useTranslation();
	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell className="p-4 md:p-16 text-center ">№</TableCell>
				<TableCell className="p-4 md:p-16">{t('Title')}</TableCell>
				<TableCell className="p-4 md:p-16">{t('Text')}</TableCell>
				<TableCell className="p-4 md:p-16 text-center">{t('Active')}</TableCell>
				<TableCell className="p-4 md:p-16 text-center">{t('Action')}</TableCell>
			</TableRow>
		</TableHead>
	);
};
export default TableHeader;
