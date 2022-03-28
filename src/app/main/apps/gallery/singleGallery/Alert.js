import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Alert({ alertOpen, setAlertOpen, deleteData }) {
	return (
		<Dialog className="dialog" open={alertOpen} fullWidth maxWidth="sm">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Delete Suggession
					</Typography>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'pt-32' }}>Are you sure delete?</DialogContent>

			<DialogActions className="justify-start px-8 pb-16 pt-16">
				<div className="pl-16">
					<Button onClick={() => setAlertOpen(false)} type="submit" variant="contained" color="secondary">
						Cancel
					</Button>
				</div>

				<div className="pl-16">
					<Button
						onClick={() => {
							deleteData();
							setAlertOpen(false);
						}}
						variant="contained"
						color="secondary"
						style={{ backgroundColor: '#e53e3e', color: '#fff' }}
					>
						Yes,delete!
					</Button>
				</div>
			</DialogActions>
		</Dialog>
	);
}

export default Alert;
