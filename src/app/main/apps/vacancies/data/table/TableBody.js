import { TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import '../vacancyStyle.css';

export default function Body({ data, goToSinglePage, setAlertOpen, setId }) {
	const locale = localStorage.getItem('locale');

	return (
		<TableBody>
			{data?.map((vacancy, n) => {
				return (
					<TableRow key={n} className="h-72 cursor-pointer" hover tabIndex={-1}>
						<TableCell
							onClick={() => goToSinglePage?.(vacancy._id, vacancy)}
							className="p-4 md:p-16 text-center"
							component="th"
							scope="row"
						>
							{n + 1}.
						</TableCell>
						<TableCell
							onClick={() => goToSinglePage?.(vacancy._id, vacancy)}
							className="p-4 md:p-16"
							component="th"
							scope="row"
						>
							{vacancy.title[locale]}
						</TableCell>

						<TableCell
							onClick={() => goToSinglePage?.(vacancy._id, vacancy)}
							className="p-4 md:p-16"
							component="th"
							scope="row"
						>
							{vacancy.text[locale]}
						</TableCell>

						<TableCell
							onClick={() => goToSinglePage?.(vacancy._id, vacancy)}
							className="p-4 md:p-16"
							component="th"
							scope="row"
						>
							<div className="text-center">
								<span className={vacancy.isActive ? `is-active active` : `is-active not-active`}></span>
							</div>
						</TableCell>

						<TableCell className="p-4 md:p-16 text-center" component="th" scope="row">
							<IconButton
								className="icon-wrapper"
								onClick={() => {
									setAlertOpen(true);
									setId(vacancy._id);
								}}
							>
								<Delete className="icon-delete" />
							</IconButton>
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
