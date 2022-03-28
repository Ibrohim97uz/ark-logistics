import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const Head = () => {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col w-full sm:w-auto">
				<div className="flex items-center mb-4">
					<Icon className="text-18" color="action">
						home
					</Icon>
					<Icon className="text-16" color="action">
						chevron_right
					</Icon>
					<Typography color="textSecondary" className="font-medium">
						Suggessions
					</Typography>
				</div>
				<Typography variant="h6" className="text-18 sm:text-24 font-semibold">
					Suggessions and Questions
				</Typography>
			</div>
		</div>
	);
};
export default Head;
