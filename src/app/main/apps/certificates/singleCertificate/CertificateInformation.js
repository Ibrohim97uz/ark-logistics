import { Typography, CardContent, Avatar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import './style.css';
import gallery from '../data/image/gallery.png';

const CerviceInformation = ({ data }) => {
	const { t } = useTranslation();
	const locale = localStorage.getItem('locale');
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	return (
		<CardContent>
			<div className="flex justify-center items-center flex-col">
				<div className="w-256 h-256 certificate-image-wrapper-info">
					<Avatar className="certificate-image" src={serverUrl + data?.image.src} />
				</div>
			</div>

			<div className="mb-24">
				<Typography className="font-semibold mb-4 text-15">{t('Title')}</Typography>
				<Typography>{data?.title[locale]}</Typography>
			</div>

			<div className="mb-24">
				<Typography className="font-semibold mb-4 text-15">{t('Description')}</Typography>
				<Typography>{data?.description[locale]}</Typography>
			</div>
			<div className="mb-24">
				<Typography className="font-semibold mb-4 text-15">{t('Type')}</Typography>
				<Typography>{data?.type}</Typography>
			</div>

			<div className="mb-24">
				<Typography className="font-semibold mb-4 text-15">{t('Created at')}</Typography>

				<Typography>{data?.date}</Typography>
			</div>
		</CardContent>
	);
};
export default CerviceInformation;
