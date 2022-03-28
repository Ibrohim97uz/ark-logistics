import { useEffect, useState } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Head from './data/Head';
import Body from './data/Body';

const StaffsApp = props => {
	const [alertOpen, setAlertOpen] = useState(false);
	const [addNewOpen, setAddNewOpen] = useState(false);

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<Head
					addNewOpen={addNewOpen}
					setAddNewOpen={setAddNewOpen}
					alertOpen={alertOpen}
					setAlertOpen={setAlertOpen}
				/>
			}
			content={
				<Body
					addNewOpen={addNewOpen}
					setAddNewOpen={setAddNewOpen}
					props={props}
					alertOpen={alertOpen}
					setAlertOpen={setAlertOpen}
				/>
			}
		/>
	);
};
export default StaffsApp;
