import { TableCell, TableHead, TableRow } from '@material-ui/core';

const TableHeader = props => {
	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell className="p-4 md:p-16 text-center ">Image</TableCell>
				<TableCell className="p-4 md:p-16">Name</TableCell>
				<TableCell className="p-4 md:p-16">Surname</TableCell>
				<TableCell className="p-4 md:p-16">Role</TableCell>
				<TableCell className="p-4 md:p-16 text-center">Phone</TableCell>
				<TableCell className="p-4 md:p-16 text-center">Address</TableCell>
			</TableRow>
		</TableHead>
	);
};
export default TableHeader;
