import FuseLoading from '@fuse/core/FuseLoading';
import { createMuiTheme, Card, AppBar, Typography, makeStyles, Toolbar } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GetCertificateById } from 'hooks';
import './style.css';
import CertificateInformation from './CertificateInformation';
import EditCertificate from './EditCertificate';

import FusePageCarded from '@fuse/core/FusePageCarded';
import Head from './Head';

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

function Certificate(props) {
	const { t } = useTranslation();

	const certificateId = props?.location?.state;

	const [selectedTab, setSelectedTab] = useState(0);

	const { data, refetch, isLoading, isError } = GetCertificateById(certificateId);

	const handleEditInformation = () => {
		setSelectedTab(0);
		refetch();
	};
	const [alertOpen, setAlertOpen] = useState(false);

	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
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
					{t('Error in request!')}
				</Typography>
			</motion.div>
		);
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<Head
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
					alertOpen={alertOpen}
					setAlertOpen={setAlertOpen}
				/>
			}
			content={
				<motion.div
					className="flex flex-1 items-top justify-center h-full"
					initial={{ scale: 0 }}
					animate={{ scale: 1, transition: { delay: 0.1 } }}
				>
					<Card component={motion.div} variants={item} className="w-full rounded-16 shadow">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8 flex justify-between">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
									{selectedTab === 0 ? t('Certificate info') : t('Edit Ceritficate')}
								</Typography>
							</Toolbar>
						</AppBar>

						{selectedTab === 0 && <CertificateInformation data={data?.data?.certificate} />}
						{selectedTab === 1 && (
							<EditCertificate
								handleEditInformation={handleEditInformation}
								isLoading={isLoading}
								data={data.data?.certificate}
							/>
						)}
					</Card>
				</motion.div>
			}
		/>
	);
}

export default Certificate;
