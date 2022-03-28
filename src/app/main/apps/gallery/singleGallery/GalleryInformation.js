import { Typography, CardContent, Avatar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import './style.css';
import gallery from '../data/image/gallery.png';

const VacancyInformation = ({ data }) => {
	const { t } = useTranslation();
	const locale = localStorage.getItem('locale');
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	return (
		<CardContent>
			<div className="flex justify-center items-center flex-col">
				<div className="w-256 h-256 gallery-image-wrapper-info">
					{data?.image ? (
						<Avatar className="gallery-image" src={serverUrl + data?.image} />
					) : data?.video ? (
						<video className="gallery-image" src={serverUrl + data.video} controls />
					) : (
						<Avatar className="gallery-image" src={gallery} />
					)}
				</div>
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
export default VacancyInformation;
