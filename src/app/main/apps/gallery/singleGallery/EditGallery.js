import { useState, useEffect, useRef } from 'react';
import { Add } from '@material-ui/icons';
import { Typography, CardContent, Avatar, IconButton, Button, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PatchGallery } from 'hooks';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

import './style.css';
import image from '../data/image/gallery.png';

const VacancyInformation = ({ data, handleEditInformation }) => {
	const { t } = useTranslation();
	const previewTemp = useRef();
	const dispatch = useDispatch();

	const serverUrl = process.env.REACT_APP_SERVER_URL;

	const patchGallery = PatchGallery(data._id);

	const defaultValues = {
		title: {
			uz: data?.title?.uz,
			ru: data?.title?.ru,
			en: data?.title?.en
		}
	};

	const [inputDatas, setInputDatas] = useState(defaultValues);

	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState({});

	const previewFunc = () => {
		if (!selectedFile) {
			!preview?.file && setPreview({});
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile.file);

		if (
			selectedFile.type === 'image/gif' ||
			selectedFile.type === 'image/jpeg' ||
			selectedFile.type === 'image/jpg' ||
			selectedFile.type === 'image/png'
		) {
			setPreview({ file: objectUrl, type: 'image' });
		} else {
			setPreview({ file: objectUrl, type: 'video' });
		}

		() => URL.revokeObjectURL(objectUrl);
	};

	previewTemp.current = previewFunc;

	useEffect(() => {
		previewTemp.current();
	}, [selectedFile]);

	const onSelectFile = e => {
		if (!e.target.files || e.target.files.length === 0) {
			!preview?.file && setSelectedFile({});
			return;
		}

		setSelectedFile({
			file: e.target.files[0],
			type: e.target.files[0].type
		});
	};

	const createFormData = (fData, file) => {
		const formData = new FormData();

		formData.append('gallery', JSON.stringify(fData));

		file && formData.append('gallery', file, file?.name);

		return formData;
	};

	const handleSubmit = (e, file, formDataCreator) => {
		e.preventDefault();
		const obj = {
			...inputDatas
		};
		const CreatedData = formDataCreator(obj, file);

		patchGallery
			.mutateAsync(CreatedData)
			.then(res => handleEditInformation())
			.catch(err => dispatch(showMessage({ message: err.message })));
	};

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				handleSubmit(e, selectedFile.file, createFormData);
			}}
		>
			<CardContent>
				<div className="flex justify-center items-center flex-col">
					<div className="w-256 h-256 gallery-image-wrapper">
						{preview.file ? (
							preview.type === 'image' ? (
								<Avatar className="gallery-image" src={preview.file} />
							) : (
								<video className="gallery-image">
									<source controls src={preview.file} />
									<track kind="captions" srcLang="en" label="english_captions" />
								</video>
							)
						) : data?.image ? (
							<Avatar className="gallery-image" src={serverUrl + data?.image} />
						) : data?.video ? (
							<video controls className="gallery-image">
								<source src={serverUrl + data.video} />
								<track kind="captions" srcLang="en" label="english_captions" />
							</video>
						) : (
							<Avatar className="gallery-image" src={image} />
						)}
					</div>

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
						onChange={onSelectFile}
					/>
				</div>

				<div className="mb-24">
					<Typography className="font-semibold mb-16 text-15">{t('Title EN')}</Typography>
					<TextField
						required
						fullWidth
						id="outlined-multiline-static"
						label={t('Text EN')}
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
						label={t('Text UZ')}
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
						label={t('Text RU')}
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
					<Button type="submit" variant="contained" color="primary">
						{t('Submit')}
					</Button>
				</div>
			</CardContent>
		</form>
	);
};
export default VacancyInformation;
