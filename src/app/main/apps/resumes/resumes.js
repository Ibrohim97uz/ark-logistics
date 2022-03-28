import FusePageCarded from '@fuse/core/FusePageCarded';
import Head from './data/Head';
import Body from './data/Body';

const SuggessionsApp = props => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<Head />}
			content={<Body />}
			innerScroll
		/>
	);
};
export default SuggessionsApp;
