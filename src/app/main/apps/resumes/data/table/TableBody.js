import { TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import { Delete, CloudDownload } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

export default function Body({ data, setAlertOpen, setId }) {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { t } = useTranslation();
	const locale = window.localStorage.getItem('locale');

	return (
		<TableBody>
			{data?.map((resume, n) => {
				return (
					<TableRow key={n} className="h-72 cursor-pointer" hover tabIndex={-1}>
						<TableCell className="p-4 md:p-16 text-center" component="th" scope="row">
							{n + 1}.
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{resume.fullName}
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{resume.email}
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{resume.phoneNumber}
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{resume.vacancy[locale]}
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							<IconButton>
								<a href={serverUrl + resume.file} download>
									<abbr title={t('Download Resume')}>
										<CloudDownload />
									</abbr>
								</a>
							</IconButton>
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{resume.date}
						</TableCell>

						<TableCell className="p-4 md:p-16 text-center" component="th" scope="row">
							<IconButton
								onClick={() => {
									setAlertOpen(true);
									setId(resume._id);
								}}
							>
								<Delete />
							</IconButton>
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
