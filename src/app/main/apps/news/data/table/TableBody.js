import DeleteIcon from '@material-ui/icons/Delete';
import { TableBody, TableCell, TableRow, IconButton, Avatar } from '@material-ui/core';

export default function Body({ data, goToSinglePage, setAlertOpen, setId }) {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const locale = localStorage.getItem('locale');

	return (
		<TableBody>
			{data?.map((news, n) => {
				return (
					<TableRow key={n} className="h-72 cursor-pointer" hover tabIndex={-1}>
						<TableCell
							onClick={() => goToSinglePage?.(news._id)}
							className="p-4 md:p-16"
							component="th"
							scope="row"
						>
							{n + 1}.
						</TableCell>

						<TableCell
							onClick={() => goToSinglePage?.(news._id)}
							className="p-4 md:p-16"
							component="th"
							scope="row"
						>
							{news?.images?.length && <Avatar src={serverUrl + news?.images[0]?.src} />}
						</TableCell>

						<TableCell
							onClick={() => goToSinglePage?.(news._id)}
							className="p-4 md:p-16 "
							component="th"
							scope="row"
						>
							{news.title[locale]}
						</TableCell>

						<TableCell
							onClick={() => goToSinglePage?.(news._id)}
							className="p-4 md:p-16"
							component="th"
							scope="row"
						>
							{news.text[locale]}
						</TableCell>

						<TableCell
							onClick={() => goToSinglePage?.(news._id)}
							className="p-4 md:p-16 text-center"
							component="th"
							scope="row"
						>
							{news.date}
						</TableCell>

						<TableCell className="p-4 md:p-16 text-center" component="th" scope="row">
							<IconButton
								onClick={() => {
									setId(news._id);
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
