import * as React from 'react';
import { Typography, CardContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import '../data/vacancyStyle.css';

const VacancyInformation = ({ data }) => {
	const { t } = useTranslation();
	const locale = localStorage.getItem('locale');

	return (
		<CardContent>
			<div className="mb-24">
				<Typography className="font-semibold mb-4 text-15">{t('Title')}</Typography>
				<Typography>{data?.title[locale]}</Typography>
			</div>
			<div className="mb-24">
				<Typography className="font-semibold mb-4 text-15">{t('Vacancy info')}</Typography>
				<Typography>{data?.text[locale]}</Typography>
			</div>
			<div className="mb-24">
				<Typography className="font-semibold mb-4 text-15">{t('Is Active')}</Typography>

				<span className={data.isActive ? `is-active active` : `is-active not-active`} />
			</div>
		</CardContent>
	);
};
export default VacancyInformation;
