import { useState, useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { Typography, Toolbar, Card, CardContent, AppBar, TextField, Switch, Button, Avatar } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PatchStaff } from 'hooks';

import './style.css';

export default function EditInformation({ data, isLoading, handleEditInformation }) {
	const patchStaff = PatchStaff(data._id);

	const { t } = useTranslation();
	const locale = localStorage.getItem('locale');
	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	const defaultValues = {
		definition: data?.definition[locale],
		streetAddress: data?.streetAddress,
		region: data?.region,
		district: data?.district,
		phone: data?.phone,
		telegram: data?.telegram,
		email: data?.email,
		active: data?.active,
		name: data?.name,
		surname: data?.surname,
		fathersName: data?.fathersName,
		position: data?.position
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
			...inputDatas,
			definition: {
				...data.definition,
				[locale]: inputDatas.definition
			}
		};
		const CreatedData = formDataCreator(obj, file);

		patchStaff
			.mutateAsync(CreatedData)
			.then(res => handleEditInformation())
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
								{t('Edit information')}
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
							<Typography className="font-semibold mb-16 text-15">{t('Position')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('Position')}
								multiline
								value={inputDatas.position}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										position: e.target.value
									})
								}
								variant="outlined"
							/>
						</div>

						<div className="mb-24">
							<Typography className="font-semibold mb-16 text-15">{t('About')}</Typography>
							<TextField
								fullWidth
								id="outlined-multiline-static"
								label={t('About')}
								multiline
								value={inputDatas.definition}
								onChange={e =>
									setInputDatas({
										...inputDatas,
										definition: e.target.value
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
								required
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
								required
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
								required
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
