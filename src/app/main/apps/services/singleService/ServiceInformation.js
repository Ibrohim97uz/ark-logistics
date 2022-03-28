import { Typography, CardContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import './style.css';
import image from '../data/image/gallery.png';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ServiceInformation = ({ data }) => {
	const { t } = useTranslation();
	const locale = localStorage.getItem('locale');
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	return (
		<CardContent>
			<div className="flex justify-center items-center flex-col">
				{data?.images?.length || data?.videos.length ? (
					<ImageList sx={{ width: 500, height: 450, backgroundColor: '#eee' }} cols={3} rowHeight={164}>
						{data.images?.map((preview, n) => (
							<ImageListItem key={n}>
								<img key={n} loading="lazy" src={serverUrl + preview?.src} />
							</ImageListItem>
						))}
						{data.videos?.map((preview, n) => (
							<ImageListItem key={n}>
								<video key={n} loading="lazy" controls src={serverUrl + preview?.src} />
							</ImageListItem>
						))}
					</ImageList>
				) : (
					<div className="default-image-wrapper">
						<img className="default-image" src={image} />
					</div>
				)}
			</div>

			<div className="mb-24">
				<Typography className="font-semibold mb-4 text-15">{t('Title')}</Typography>
				<Typography>{data?.title[locale]}</Typography>
			</div>

			<div className="mb-24">
				<Typography className="font-semibold mb-4 text-15">{t('Created at')}</Typography>

				<Typography>{data?.date}</Typography>
			</div>
		</CardContent>
	);
};
export default ServiceInformation;
