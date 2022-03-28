import { TableCell, TableHead, TableRow } from '@material-ui/core';

const TableHeader = props => {
	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell className="p-4 md:p-16 text-center">№</TableCell>
				<TableCell className="p-4 md:p-16">Name</TableCell>
				<TableCell className="p-4 md:p-16">Email</TableCell>
				<TableCell className="p-4 md:p-16">Description</TableCell>
				<TableCell className="p-4 md:p-16 text-center">Operation</TableCell>
			</TableRow>
		</TableHead>
	);
};
export default TableHeader;
