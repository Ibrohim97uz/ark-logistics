import * as React from 'react';
import { Typography, Toolbar, Card, CardContent, AppBar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const UserInformation = ({ data }) => {
	const { t } = useTranslation();
	const locale = localStorage.getItem('locale');
	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<>
			<Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
				<AppBar position="static" elevation={0}>
					<Toolbar className="px-8">
						<Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
							{t('About')}
						</Typography>
					</Toolbar>
				</AppBar>

				<CardContent>
					<div className="mb-24">
						<Typography>{data?.definition[locale]}</Typography>
					</div>
				</CardContent>
			</Card>

			<Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
				<AppBar position="static" elevation={0}>
					<Toolbar className="px-8">
						<Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
							{t('Contact')}
						</Typography>
					</Toolbar>
				</AppBar>

				<CardContent>
					<div className="mb-24">
						<Typography className="font-semibold mb-4 text-15">{t('Address')}</Typography>
						<Typography className="capitalize">{`${data.streetAddress} ${data?.region} ${data.district}`}</Typography>
					</div>
					<div className="mb-24">
						<Typography className="font-semibold mb-4 text-15">{t('Telephone')}</Typography>
						<Typography>
							<a href={`tel:${data.phone}`}>{data.phone}</a>
						</Typography>
					</div>
					<div className="mb-24">
						<Typography className="font-semibold mb-4 text-15">{t('Telegram')}</Typography>
						<Typography>
							<a rel="noreferrer" target="_blank" href={`https://t.me/${data.telegram}`}>
								@{data.telegram}
							</a>
						</Typography>
					</div>
					<div className="mb-24">
						<Typography className="font-semibold mb-4 text-15">{t('Email')}</Typography>
						<Typography>
							<a href={`mailto:${data.email}`}>{data.email}</a>
						</Typography>
					</div>
				</CardContent>
			</Card>
		</>
	);
};
export default UserInformation;
