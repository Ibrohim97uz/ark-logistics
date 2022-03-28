import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table, Typography } from '@material-ui/core';
import { GetAllVacancies, DeleteVacancy } from 'hooks';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Alert from './table/Alert';
import TableBody from './table/TableBody';
import TableHead from './table/TableHead';
import AddNewStaff from './table/AddNewStaff';

const Body = ({ props, addNewOpen, setAddNewOpen }) => {
	const { isLoading, isError, refetch, data } = GetAllVacancies();

	const [alertOpen, setAlertOpen] = useState(false);
	const [id, setId] = useState('');
	const deleteVacancy = DeleteVacancy(id);

	const [vacancies, setVacancies] = useState([]);

	useEffect(() => {
		setVacancies(data?.data?.vacancies);
	}, [data]);

	const deleteData = async () => {
		deleteVacancy
			.mutateAsync()
			.then(() => refetch())
			.catch(err => console.log(err.message));
		setId('');
	};

	const handleFetch = () => {
		refetch();
	};
	const goToSinglePage = pageId => {
		props.history.push(`/apps/vacancies/${pageId}`, pageId);
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

	if (vacancies?.length === 0 && !addNewOpen) {
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
					<AddNewStaff handleFetch={handleFetch} setAddNewOpen={setAddNewOpen} />
				) : (
					<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
						<TableHead />
						<TableBody
							setAlertOpen={setAlertOpen}
							setId={setId}
							handleFetch={handleFetch}
							goToSinglePage={goToSinglePage}
							data={vacancies}
						/>
					</Table>
				)}
			</FuseScrollbars>
			<Alert alertOpen={alertOpen} deleteData={deleteData} setAlertOpen={setAlertOpen} />
		</div>
	);
};
export default Body;
