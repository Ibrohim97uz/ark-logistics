import { TableBody, TableCell, TableRow, Avatar } from '@material-ui/core';

export default function Body({ data, goToSinglePage }) {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const locale = localStorage.getItem('locale');

	return (
		<TableBody>
			{data?.map((staff, n) => {
				return (
					<TableRow
						onClick={() => goToSinglePage?.(staff._id, staff)}
						key={n}
						className="h-72 cursor-pointer"
						hover
						tabIndex={-1}
					>
						<TableCell className="p-4 md:p-16 justify-center" component="th" scope="row">
							<Avatar alt={staff.name} style={{ margin: 'auto' }} src={serverUrl + staff.image.src} />
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{staff.name}
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{staff.surname}
						</TableCell>

						<TableCell className="p-4 md:p-16" component="th" scope="row">
							{staff.position[locale]}
						</TableCell>
						<TableCell className="p-4 md:p-16 text-center" component="th" scope="row">
							{staff.phone}
						</TableCell>
						<TableCell className="p-4 md:p-16 text-center" component="th" scope="row">
							{`${staff.streetAddress}, ${staff.region}`}
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
