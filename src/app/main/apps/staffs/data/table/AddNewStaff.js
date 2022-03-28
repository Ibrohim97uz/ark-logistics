import { useState, useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { Typography, Toolbar, Card, CardContent, AppBar, TextField, Switch, Button, Avatar } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CreateStaff } from 'hooks';

import '../../singleStaff/style.css';

export default function AddNewStaff({ data, isLoading, handleFetch, setAddNewOpen }) {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const createStaff = CreateStaff();
	const { t } = useTranslation();
	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};

	const defaultValues = {
		definition: {
			uz: '',
			ru: '',
			en: ''
		},
		streetAddress: '',
		region: '',
		district: '',
		phone: '',
		telegram: '',
		email: '',
		active: false,
		name: '',
		surname: '',
		fathersName: '',
		position: {
			uz: '',
			ru: '',
			en: ''
		}
	};

	const [inputDatas, setInputDatas] = useState(defaultValues);

	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		() => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const onSelectFile = e => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}

		setSelectedFile(e.target.files[0]);
	};

	const createFormData = (fData, file) => {
		const formData = new FormData();

		formData.append('staff', JSON.stringify(fData));
		file && formData.append('staff', file, file?.name);

		return formData;
	};

	const handleSubmit = (e, file, formDataCreator) => {
		e.preventDefault();
		const obj = {
			...inputDatas
		};
		const CreatedData = formDataCreator(obj, file);

		createStaff
			.mutateAsync(CreatedData)
			.then(res => {
				console.log(handleFetch);
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
					handleSubmit(e, selectedFile, createFormData);
				}}
			>
				<Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
					<AppBar position="static" elevation={0}>
						<Toolbar className="px-8">
							<Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
								{t('Create new staff')}
							</Typography>
						</Toolbar>
					</AppBar>

					<CardContent>
						<div className="flex justify-center ">
							<label htmlFor="file">
								<div className="w-128 h-128 staff-image-wrapper">
									{!preview ? (
										<Avatar className="staff-image" src={serverUrl + data?.image?.src} />
									) : (
										<Avatar className="staff-image" src={preview} />
									)}
									<div className="addNew">+</div>
								</div>
							</label>
							<input
								type="file"
								accept="image/gif, image/jpeg, image/png"
								name="image"
								id="file"
								style={{ display: 'none' }}
								onChange={onSelectFile}
							/>
						</div>

						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Name')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Name')}
								multiline
								value={inputDatas.name}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										name: e.target.value
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Surname')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Surname')}
								multiline
								required
								value={inputDatas.surname}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										surname: e.target.value
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t("Father's name")}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t("Father's name")}
								multiline
								value={inputDatas.fathersName}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										fathersName: e.target.value
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Position En')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Position En')}
								multiline
								value={inputDatas.position.en}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										position: {
											...inputDatas.position,
											en: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Position Ru')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Position Ru')}
								multiline
								value={inputDatas.position.ru}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										position: {
											...inputDatas.position,
											ru: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Position Uz')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Position Uz')}
								multiline
								value={inputDatas.position.uz}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										position: {
											...inputDatas.position,
											uz: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>

						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('About En')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('About En')}
								multiline
								value={inputDatas.definition.en}
								required
								onChange={e =>
									setInputDatas({
										...inputDatas,
										definition: {
											...inputDatas.definition,
											en: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('About Ru')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								required
								label={t('About')}
								multiline
								value={inputDatas.definition.ru}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										definition: {
											...inputDatas.definition,
											ru: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('About Uz')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('About')}
								required
								multiline
								value={inputDatas.definition.uz}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										definition: {
											...inputDatas.definition,
											uz: e.target.value
										}
									})
								}
								variant="outlined"
							/>
						</div>

						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Street Adress')}</Typography>
							<TextField
								required
								id="outlined-required"
								label={t('Street Adress')}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										streetAddress: e.target.value
									})
								}
								value={inputDatas.streetAddress}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Region')}</Typography>
							<TextField
								required
								id="outlined-required"
								label={t('Region')}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										region: e.target.value
									})
								}
								value={inputDatas.region}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('District')}</Typography>
							<TextField
								required
								id="outlined-required"
								label={t('District')}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										district: e.target.value
									})
								}
								value={inputDatas.district}
								variant="outlined"
								fullWidth
							/>
						</div>

						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Telephone')}</Typography>
							<TextField
								id="outlined-required"
								label={t('Telephone')}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										phone: e.target.value
									})
								}
								value={inputDatas.phone}
								variant="outlined"
								fullWidth
							/>
						</div>

						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Telegram')}</Typography>
							<TextField
								id="outlined-required"
								label={t('Telegram')}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										telegram: e.target.value
									})
								}
								value={inputDatas.telegram}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Email')}</Typography>
							<TextField
								id="outlined-required"
								label={t('Email')}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										email: e.target.value
									})
								}
								value={inputDatas.email}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('Active')}</Typography>
							<Switch
								checked={inputDatas.active}
								onChange={() =>
									setInputDatas({
										...inputDatas,
										...inputDatas,
										active: !inputDatas.active
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
