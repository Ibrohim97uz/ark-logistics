import { useState, useEffect } from 'react';
import { Add } from '@material-ui/icons';
import { Typography, CardContent, Avatar, IconButton, Button, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CreateGallery } from 'hooks';
import '../../singleGallery/style.css';
import image from '../../data/image/gallery.png';

export default function AddNewGallery({ isLoading, handleFetch, setAddNewOpen }) {
	const { t } = useTranslation();

	const serverUrl = process.env.REACT_APP_SERVER_URL;

	const createGallery = CreateGallery();

	const defaultValues = {
		title: {
			uz: '',
			ru: '',
			en: ''
		}
	};

	const [inputDatas, setInputDatas] = useState(defaultValues);

	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState({});

	useEffect(() => {
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

		createGallery
			.mutateAsync(CreatedData)
			.then(res => {
				handleFetch();
				setAddNewOpen(false);
			})
			.catch(err => alert(err.message));
	};

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				handleSubmit(e, selectedFile?.file, createFormData);
			}}
		>
			<CardContent>
				<div className="flex justify-center items-center flex-col">
					<div className="w-256 h-256 gallery-image-wrapper">
						{preview.file ? (
							preview.type === 'image' ? (
								<Avatar className="gallery-image" src={preview.file} />
							) : (
								<video className="gallery-image" controls src={preview.file} />
							)
						) : (
							<Avatar className="gallery-image" src={image} />
						)}
					</div>

					<div className="flex flex-column justify-center mt-12">
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
}
