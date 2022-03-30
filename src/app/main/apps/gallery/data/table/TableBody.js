import DeleteIcon from '@material-ui/icons/Delete';
import { TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export default function Body({ data, goToSinglePage, setAlertOpen, setId }) {
	const { t } = useTranslation();
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const locale = localStorage.getItem('locale');

	return (
		<TableBody>
			{data?.map((gallery, n) => {
				return (
					<TableRow key={n} className="h-72 cursor-pointer" hover tabIndex={-1}>
						<TableCell
							onClick={() => goToSinglePage?.(gallery._id)}
							className="p-4 md:p-16"
							component="th"
							scope="row"
						>
							{n + 1}.
						</TableCell>

						<TableCell
							onClick={() => goToSinglePage?.(gallery._id)}
							className="p-4 md:p-16 text-center"
							component="th"
							scope="row"
						>
							{gallery.title[locale]}
						</TableCell>

						<TableCell
							onClick={() => goToSinglePage?.(gallery._id)}
							className="p-4 md:p-16 text-center"
							component="th"
							scope="row"
						>
							{gallery.date}
						</TableCell>

						<TableCell className="p-4 md:p-16 text-center" component="th" scope="row">
							<IconButton
								onClick={() => {
									setId(gallery._id);
									setAlertOpen(true);
								}}
							>
								<DeleteIcon />
							</IconButton>
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
