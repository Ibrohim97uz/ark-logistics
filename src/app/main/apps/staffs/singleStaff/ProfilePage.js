import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseLoading from '@fuse/core/FuseLoading';
import { createMuiTheme, ThemeProvider, Avatar, Button, Badge, Typography, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { GetStaffById, DeleteStaff } from 'hooks';
import './style.css';
import UserInformation from './UserInformation';
import EditInformation from './EditInformation';
import Alert from './Alert';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#f00'
		},
		secondary: {
			main: '#07ed0d'
		}
	}
});

const useStyles = makeStyles(thm => ({
	avatar: {
		border: `4px solid ${thm.palette.background.default}`
	},
	topBg: {
		background: 'url("assets/images/profile/morain-lake.jpg")!important',
		backgroundSize: 'cover!important',
		backgroundPosition: 'center center!important'
	},
	layoutHeader: {
		background: 'none',
		height: 320,
		minHeight: 320,
		[thm.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	},
	root: {
		display: 'flex',
		'& > *': {
			margin: thm.spacing(1)
		}
	}
}));

function ProfilePage(props) {
	const { t } = useTranslation();
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const staffId = props?.location?.state;

	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);

	const { data, refetch, isLoading, isError } = GetStaffById(staffId);

	const deleteStaff = DeleteStaff(staffId);

	const handleEditInformation = () => {
		setSelectedTab(0);
		refetch();
	};
	const [alertOpen, setAlertOpen] = useState(false);

	//

	const deleteData = () => {
		deleteStaff
			.mutateAsync()
			.then(() => props.history.push('/apps/staffs'))
			.catch(err => console.log(err));
	};

	if (isLoading) {
		return <FuseLoading />;
	}

	if (isError) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					Error in request!
				</Typography>
			</motion.div>
		);
	}

	return (
		<FusePageSimple
			classes={{
				topBg: classes.topBg,
				header: classes.layoutHeader,
				wrapper: 'bg-transparent',
				content: 'w-full max-w-2xl mx-auto',
				toolbar: 'w-full max-w-2xl mx-auto relative flex flex-col min-h-auto h-auto items-start'
			}}
			header={<></>}
			contentToolbar={
				<div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
					<motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
						<ThemeProvider theme={theme}>
							<div className={classes.root}>
								<Badge
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right'
									}}
									badgeContent=""
									color={data.data.active ? 'secondary' : 'primary'}
									className=" avatar-badge-profile"
								>
									<Avatar
										className={clsx(classes.avatar, '-mt-64  w-128 h-128')}
										src={serverUrl + data.data?.image?.src}
									/>
								</Badge>
							</div>
						</ThemeProvider>
					</motion.div>
					<div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8">
						<motion.div
							initial={{ opacity: 0, x: -40 }}
							animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
						>
							<Typography
								className="md:px-16 capitalize text-24 md:text-32 font-semibold tracking-tight"
								variant="h4"
								color="inherit"
							>
								{`${data.data.name} ${data.data.surname} ${data.data.fathersName}`}
							</Typography>

							<Typography
								className="md:px-16 capitalize text-9 md:text-16 font-semibold tracking-tight"
								variant="h4"
								color="inherit"
								style={{ color: '#9e9e9e' }}
							>
								{data?.position}
							</Typography>
						</motion.div>

						<div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
							{selectedTab === 0 && (
								<Button
									onClick={() => setSelectedTab(1)}
									className="mx-8"
									variant="contained"
									color="secondary"
									aria-label="Edit"
								>
									{t('Edit')}
								</Button>
							)}
							{selectedTab === 1 && (
								<Button
									onClick={() => setSelectedTab(0)}
									className="mx-8"
									variant="contained"
									color="secondary"
									aria-label="Cancel"
								>
									{t('Cancel Edit')}
								</Button>
							)}

							<Button
								variant="contained"
								color="default"
								style={{ backgroundColor: '#d32f2f', color: '#fff' }}
								aria-label="Delete"
								onClick={() => setAlertOpen(true)}
							>
								{t('Delete')}
							</Button>
						</div>
					</div>
				</div>
			}
			content={
				<div className="p-16 sm:p-24">
					{selectedTab === 0 && (
						<motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
							<UserInformation data={data.data} />
						</motion.div>
					)}
					{selectedTab === 1 && (
						<motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
							<EditInformation
								handleEditInformation={handleEditInformation}
								isLoading={isLoading}
								data={data.data}
							/>
						</motion.div>
					)}
					<Alert setAlertOpen={setAlertOpen} alertOpen={alertOpen} deleteData={deleteData} />
				</div>
			}
		/>
	);
}

export default ProfilePage;
