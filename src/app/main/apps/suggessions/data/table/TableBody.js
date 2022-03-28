import { TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

export default function Body({ data, setAlertOpen, setId }) {
	return (
		<TableBody>
			{data?.map((suggession, n) => {
				return (
					<TableRow key={n} className="h-72 cursor-pointer" hover tabIndex={-1}>
						<TableCell className="p-4 md:p-16 text-center" component="th" scope="row">
							{n + 1}.
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{suggession.name}
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{suggession.email}
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{suggession.description}
						</TableCell>
						<TableCell className="p-4 md:p-16 text-center" component="th" scope="row">
							<IconButton
								onClick={() => {
									setAlertOpen(true);
									setId(suggession._id);
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
