import { useState, useEffect, useRef } from 'react';
import { Add } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { CreateService } from 'hooks';

import { Typography, CardContent, Button, TextField, Switch } from '@material-ui/core';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

import '../../singleService/style.css';
import image from '../image/gallery.png';

export default function AddNewService({ handleFetch, setAddNewOpen }) {
	const { t } = useTranslation();
	const previewTemp = useRef();
	const dispatch = useDispatch();

	const createService = CreateService();

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
		status: true
	};

	const [inputDatas, setInputDatas] = useState(defaultValues);

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [previews, setPreviews] = useState([]);

	const previewFunc = () => {
		if (!selectedFiles.length) {
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFiles[selectedFiles.length - 1]);

		if (
			selectedFiles[selectedFiles.length - 1].type === 'image/gif' ||
			selectedFiles[selectedFiles.length - 1].type === 'image/jpeg' ||
			selectedFiles[selectedFiles.length - 1].type === 'image/jpg' ||
			selectedFiles[selectedFiles.length - 1].type === 'image/png'
		) {
			setPreviews([...previews, { file: objectUrl, type: 'image' }]);
		} else {
			setPreviews([...previews, { file: objectUrl, type: 'video' }]);
		}
		() => URL.revokeObjectURL(objectUrl);
	};

	previewTemp.current = previewFunc;

	useEffect(() => {
		previewTemp.current();
	}, [selectedFiles]);

	const handleChange = e => {
		if (!e.target.files[0]) {
			return;
		}
		setSelectedFiles([...selectedFiles, e.target.files[0]]);
	};

	const createFormData = (fData, file) => {
		const formData = new FormData();

		formData.append('services', JSON.stringify(fData));

		file.length && file.forEach(f => formData.append('services', f, f?.name));

		return formData;
	};

	const handleSubmit = (e, file, formDataCreator) => {
		e.preventDefault();
		const obj = {
			...inputDatas
		};
		const CreatedData = formDataCreator(obj, file);

		createService
			.mutateAsync(CreatedData)
			.then(res => {
				handleFetch();
				setAddNewOpen(false);
			})
			.catch(err => dispatch(showMessage({ message: err.message })));
	};

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				handleSubmit(e, selectedFiles, createFormData);
			}}
		>
			<CardContent>
				<div className="flex justify-center items-center flex-col">
					{previews.length ? (
						<ImageList sx={{ width: 500, height: 450, backgroundColor: '#eee' }} cols={3} rowHeight={164}>
							{previews.map((preview, n) => (
								<ImageListItem key={n}>
									{preview.file ? (
										preview.type === 'image' ? (
											<img alt="img" key={n} loading="lazy" src={preview.file} />
										) : (
											<video key={n} controls loading="lazy" className="gallery-image">
												<source src={preview.file} />
												<track kind="captions" srcLang="en" label="english_captions" />
											</video>
										)
									) : (
										<img alt="img" key={n} src={image} />
									)}
								</ImageListItem>
							))}
						</ImageList>
					) : (
						<div className="default-image-wrapper">
							<img alt="img" className="default-image" src={image} />
						</div>
					)}

					<div className="flex flex-column justify-center mt-12">
						{/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
						<label className="label" htmlFor="file">
							<Add />
						</label>
					</div>
					<input
						type="file"
						accept="image/gif, image/jpeg,image/jpg, image/png ,video/mp4, video/webm, video/ogg"
						name="image"
						id="file"
						style={{ display: 'none' }}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-24">
					<Typography className="font-semibold mb-16 text-15">{t('Title EN')}</Typography>
					<TextField
						required
						fullWidth
						id="outlined-multiline-static"
						label={t('Title EN')}
						multiline
						defaultValue={inputDatas.title.en}
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
					<Typography className="font-semibold mb-16 text-15">{t('Title UZ')}</Typography>
					<TextField
						required
						fullWidth
						id="outlined-multiline-static"
						label={t('Title UZ')}
						multiline
						defaultValue={inputDatas.title.uz}
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
						required
						fullWidth
						id="outlined-multiline-static"
						label={t('Title RU')}
						multiline
						defaultValue={inputDatas.title.ru}
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
					<Typography className="font-semibold mb-16 text-15">{t('Status')}</Typography>
					<Switch
						checked={inputDatas.status}
						onChange={() =>
							setInputDatas({
								...inputDatas,
								status: !inputDatas.status
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
	);
}
