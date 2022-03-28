import { useState, useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { Typography, Toolbar, Card, CardContent, AppBar, TextField, Switch, Button, Avatar } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CreateVacancy } from 'hooks';

import '../../singleVacancy/style.css';

export default function AddNewStaff({ isLoading, handleFetch, setAddNewOpen }) {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const createVacancy = CreateVacancy();
	const { t } = useTranslation();
	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};

	const defaultValues = {
		title: {
			uz: '',
			ru: '',
			en: ''
		},
		text: {
			uz: '',
			ru: '',
			en: ''
		},
		isActive: true
	};

	const [inputDatas, setInputDatas] = useState(defaultValues);

	const handleSubmit = () => {
		createVacancy
			.mutateAsync(inputDatas)
			.then(res => {
				handleFetch();
				setAddNewOpen(false);
			})
			.catch(err => alert(err.message));
	};

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
					<AppBar position="static" elevation={0}>
						<Toolbar className="px-8">
							<Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
								{t('Create new vacancy')}
							</Typography>
						</Toolbar>
					</AppBar>

					<CardContent>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Title en')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Title en')}
								multiline
								value={inputDatas.title.en}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										title: {
											...inputDatas.title,
											en: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Title ru')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Title ru')}
								multiline
								value={inputDatas.title.ru}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										title: {
											...inputDatas.title,
											ru: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Title uz')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Title uz')}
								multiline
								value={inputDatas.title.uz}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										title: {
											...inputDatas.title,
											uz: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>

						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Text en')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Text en')}
								multiline
								value={inputDatas.text.en}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										text: {
											...inputDatas.text,
											en: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Text ru')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Text ru')}
								multiline
								value={inputDatas.text.ru}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										text: {
											...inputDatas.text,
											ru: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Text uz')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Text uz')}
								multiline
								value={inputDatas.text.uz}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										text: {
											...inputDatas.text,
											uz: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>

						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Active')}</Typography>
							<Switch
								checked={inputDatas.isActive}
								onChange={() =>
									setInputDatas({
										...inputDatas,
										isActive: !inputDatas.isActive
									})
								}
								color="primary"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</div>

						<div className="mb-24">
							<Button type="submit" variant="contained" color="primary">
								{t('Submit')}
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</>
	);
}
