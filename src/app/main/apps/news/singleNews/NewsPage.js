import FuseLoading from '@fuse/core/FuseLoading';
import { Card, AppBar, Typography, Toolbar } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GetNewsById } from 'hooks';
import './style.css';
import NewsInformation from './NewsInformation';

import FusePageCarded from '@fuse/core/FusePageCarded';
import Head from './Head';

function Service(props) {
	const { t } = useTranslation();

	const newsId = props?.location?.state;

	const { data, refetch, isLoading, isError } = GetNewsById(newsId);

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
			header={<Head />}
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
									{t('News')}
								</Typography>
							</Toolbar>
						</AppBar>
						<NewsInformation data={data?.data} />
					</Card>
				</motion.div>
			}
		/>
	);
}

export default Service;
