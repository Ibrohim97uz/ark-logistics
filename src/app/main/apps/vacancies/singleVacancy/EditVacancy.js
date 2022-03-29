import { useState, useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { Typography, CardContent, TextField, Switch, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PatchVacancy } from 'hooks';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

import './style.css';

export default function EditVacancy({ data, isLoading, handleEditInformation }) {
	const patchVacancy = PatchVacancy(data._id);
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const defaultValues = {
		title: {
			uz: data?.title?.uz,
			ru: data?.title?.ru,
			en: data?.title?.en
		},
		text: {
			uz: data?.text?.uz,
			ru: data?.text?.ru,
			en: data?.text?.en
		},

		isActive: data?.isActive
	};

	const [inputDatas, setInputDatas] = useState(defaultValues);

	const handleSubmit = e => {
		e.preventDefault();

		patchVacancy
			.mutateAsync(inputDatas)
			.then(res => handleEditInformation())
			.catch(err => dispatch(showMessage({ message: err.message })));
	};

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<>
			<form
				onSubmit={e => {
					handleSubmit(e);
				}}
			>
				<CardContent>
					<div className="mb-24">
						<Typography className="font-semibold mb-16 text-15">{t('Title UZ')}</Typography>
						<TextField
							fullWidth
							id="outlined-multiline-static"
							label={t('Title UZ')}
							multiline
							value={inputDatas.title.uz}
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
						<Typography className="font-semibold mb-16 text-15">{t('Title RU')}</Typography>
						<TextField
							fullWidth
							id="outlined-multiline-static"
							label={t('Title RU')}
							multiline
							value={inputDatas.title.ru}
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
						<Typography className="font-semibold mb-16 text-15">{t('Title EN')}</Typography>
						<TextField
							fullWidth
							id="outlined-multiline-static"
							label={t('Title EN')}
							multiline
							value={inputDatas.title.en}
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
						<Typography className="font-semibold mb-16 text-15">{t('Text UZ')}</Typography>
						<TextField
							fullWidth
							id="outlined-multiline-static"
							label={t('Text UZ')}
							multiline
							value={inputDatas.text.uz}
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
						<Typography className="font-semibold mb-16 text-15">{t('Text RU')}</Typography>
						<TextField
							fullWidth
							id="outlined-multiline-static"
							label={t('Text RU')}
							multiline
							value={inputDatas.text.ru}
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
						<Typography className="font-semibold mb-16 text-15">{t('Text EN')}</Typography>
						<TextField
							fullWidth
							id="outlined-multiline-static"
							label={t('Text EN')}
							multiline
							value={inputDatas.text.en}
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
			</form>
		</>
	);
}
