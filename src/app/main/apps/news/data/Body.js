import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table, Typography } from '@material-ui/core';
import { GetAllNews, DeleteNews } from 'hooks';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import TableBody from './table/TableBody';
import TableHead from './table/TableHead';
import AddNewService from './table/AddNews';
import Alert from './Alert';

const Body = ({ props, addNewOpen, setAddNewOpen, alertOpen, setAlertOpen }) => {
	const { isLoading, isError, refetch, data } = GetAllNews();

	const [id, setId] = useState('');

	const deleteNews = DeleteNews(id);

	const [news, setNews] = useState([]);

	useEffect(() => {
		setNews(data?.data.news);
	}, [data]);

	const handleFetch = () => {
		refetch();
	};
	const goToSinglePage = pageId => {
		props.history.push(`/apps/news/${pageId}`, pageId);
	};

	const deleteData = () => {
		deleteNews
			.mutateAsync()
			.then(() => refetch())
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

	if (news?.length === 0 && !addNewOpen) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no datas!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				{addNewOpen ? (
					<AddNewService handleFetch={handleFetch} isLoading={isLoading} setAddNewOpen={setAddNewOpen} />
				) : (
					<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
						<TableHead />
						<TableBody
							setId={setId}
							setAlertOpen={setAlertOpen}
							goToSinglePage={goToSinglePage}
							data={news}
						/>
					</Table>
				)}
			</FuseScrollbars>
			<Alert deleteData={deleteData} alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
		</div>
	);
};
export default Body;
