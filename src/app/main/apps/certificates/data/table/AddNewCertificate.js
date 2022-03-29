import { useState, useEffect } from 'react';
import { Add } from '@material-ui/icons';
import {
	Typography,
	CardContent,
	Avatar,
	InputLabel,
	Button,
	TextField,
	MenuItem,
	FormControl,
	Select
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CreateCertificate } from 'hooks';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

import '../../singleCertificate/style.css';

const AddNewCertificate = ({ handleFetch, setAddNewOpen }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const createCertificate = CreateCertificate();

	const defaultValues = {
		title: {
			uz: '',
			ru: '',
			en: ''
		},
		description: {
			uz: '',
			ru: '',
			en: ''
		},
		type: 'firm'
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

		formData.append('certificate', JSON.stringify(fData));
		file && formData.append('certificate', file, file?.name);

		return formData;
	};

	const handleSubmit = (e, file, formDataCreator) => {
		e.preventDefault();
		const obj = {
			...inputDatas
		};
		const CreatedData = formDataCreator(obj, file);

		createCertificate
			.mutateAsync(CreatedData)
			.then(res => {
				handleFetch();
				setAddNewOpen();
			})
			.catch(err => {
				dispatch(showMessage({ message: err.message }));
			});
	};

	const handleChange = e => {
		e.preventDefault();

		if (e.target.value === 1) {
			setInputDatas({ ...inputDatas, type: 'firm' });
		} else {
			setInputDatas({ ...inputDatas, type: 'staff' });
		}
	};

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				handleSubmit(e, selectedFile, createFormData);
			}}
		>
			<CardContent>
				<div className="flex justify-center items-center flex-col">
					<div className="w-256 h-256 certificate-image-wrapper">
						<Avatar className="certificate-image" src={preview} />
					</div>

					<div className="flex flex-column justify-center mt-12">
						{/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
						<label className="label" htmlFor="file">
							<Add />
						</label>
					</div>
					<input
						type="file"
						accept="image/gif, image/jpeg,image/jpg, image/png"
						name="image"
						id="file"
						style={{ display: 'none' }}
						onChange={onSelectFile}
					/>
				</div>

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
					<Typography className="font-semibold mb-16 text-15">{t('Description UZ')}</Typography>
					<TextField
						fullWidth
						id="outlined-multiline-static"
						label={t('Description UZ')}
						multiline
						value={inputDatas.description.uz}
						onChange={e =>
							setInputDatas({
								...inputDatas,
								description: {
									...inputDatas.description,
									uz: e.target.value
								}
							})
						}
						variant="outlined"
					/>
				</div>
				<div className="mb-24">
					<Typography className="font-semibold mb-16 text-15">{t('Description RU')}</Typography>
					<TextField
						fullWidth
						id="outlined-multiline-static"
						label={t('Description RU')}
						multiline
						value={inputDatas.description.ru}
						onChange={e =>
							setInputDatas({
								...inputDatas,
								description: {
									...inputDatas.description,
									ru: e.target.value
								}
							})
						}
						variant="outlined"
					/>
				</div>
				<div className="mb-24">
					<Typography className="font-semibold mb-16 text-15">{t('Description EN')}</Typography>
					<TextField
						fullWidth
						id="outlined-multiline-static"
						label={t('Description EN')}
						multiline
						value={inputDatas.description.en}
						onChange={e =>
							setInputDatas({
								...inputDatas,
								description: {
									...inputDatas.description,
									en: e.target.value
								}
							})
						}
						variant="outlined"
					/>
				</div>

				<div className="mb-24">
					<FormControl className="w-full">
						<InputLabel id="type">{t('Type')}</InputLabel>
						<Select
							labelId="type"
							id="type-select"
							value={inputDatas.type === 'staff' ? 2 : 1}
							onChange={e => {
								e.preventDefault();
								handleChange(e);
							}}
						>
							<MenuItem value={1}>{t('firm')}</MenuItem>
							<MenuItem value={2}>{t('staff')}</MenuItem>
						</Select>
					</FormControl>
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
export default AddNewCertificate;
