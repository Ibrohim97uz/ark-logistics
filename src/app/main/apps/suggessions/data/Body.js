import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table, Typography } from '@material-ui/core';
import { GetAllSuggessions, DeleteSuggession } from 'hooks';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Alert from './table/Alert';

import TableBody from './table/TableBody';
import TableHead from './table/TableHead';

const Body = () => {
	const [alertOpen, setAlertOpen] = useState(false);
	const { isLoading, isError, refetch, data } = GetAllSuggessions();

	const [id, setId] = useState('');
	const deleteSuggession = DeleteSuggession(id);

	const [suggessions, setSuggessions] = useState([]);

	useEffect(() => {
		setSuggessions(data?.data);
	}, [data]);

	const deleteData = async () => {
		deleteSuggession
			.mutateAsync()
			.then(() => refetch())
			.catch(err => console.log(err.message));
		setId('');
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

	if (suggessions?.length === 0) {
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
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<TableHead />
					<TableBody setAlertOpen={setAlertOpen} setId={setId} data={suggessions} />
				</Table>
			</FuseScrollbars>

			<Alert alertOpen={alertOpen} deleteData={deleteData} setAlertOpen={setAlertOpen} />
		</div>
	);
};
export default Body;
