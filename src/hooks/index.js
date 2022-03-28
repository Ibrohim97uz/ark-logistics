import useQuery from './use-query';
import useMutation from './use-mutation';

const route = process.env.REACT_APP_SERVER_URL;

export const routes = {
	register: '/api/register',
	login: '/api/login',
	regionsAndDistricts: '/api/regionsAndDistricts',
	suggessions: '/api/suggessions',
	staffs: '/api/staffs',
	news: '/api/news',
	vacancies: '/api/vacancies',
	certificates: '/api/certificates',
	resume: '/api/resume',
	gallery: '/api/gallery',
	services: '/api/services'
};

export const Login = route + routes.login;

export const Register = () => {
	return useMutation('post', routes.register);
};

// SUGGESSION
export const GetAllSuggessions = () => {
	return useQuery(route + routes.suggessions);
};
export const GetSuggessionById = id => {
	return useQuery(`${routes.suggessions}/${id}`);
};

export const DeleteSuggession = id => {
	return useMutation('delete', `${route + routes.suggessions}/${id}`);
};

// STAFFS

export const GetAllStaffs = () => {
	return useQuery(route + routes.staffs);
};
export const GetStaffById = id => {
	return useQuery(route + routes.staffs + '/' + id);
};

export const PatchStaff = (id, formData) => {
	return useMutation('patch', `${route + routes.staffs}/${id}`);
};
export const CreateStaff = () => {
	return useMutation('post', route + routes.staffs);
};
export const DeleteStaff = id => {
	return useMutation('delete', `${route + routes.staffs}/${id}`);
};

// RESUMES

export const GetAllResumes = () => {
	return useQuery(route + routes.resume);
};

export const DeleteResume = id => {
	return useMutation('delete', `${route + routes.resume}/${id}`);
};

// VACANCIES

export const GetAllVacancies = () => {
	return useQuery(route + routes.vacancies);
};

export const CreateVacancy = () => {
	return useMutation('post', route + routes.vacancies);
};

export const DeleteVacancy = id => {
	return useMutation('delete', `${route + routes.vacancies}/${id}`);
};

export const PatchVacancy = id => {
	return useMutation('patch', `${route + routes.vacancies}/${id}`);
};

export const GetVacancyById = id => {
	return useQuery(route + routes.vacancies + '/' + id);
};

// GALLERY

export const GetAllGalleries = () => {
	return useQuery(route + routes.gallery);
};
export const GetGalleryById = id => {
	return useQuery(route + routes.gallery + '/' + id);
};

export const PatchGallery = id => {
	return useMutation('patch', `${route + routes.gallery}/${id}`);
};
export const CreateGallery = () => {
	return useMutation('post', route + routes.gallery);
};
export const DeleteGallery = id => {
	return useMutation('delete', `${route + routes.gallery}/${id}`);
};

// SERVICES

export const GetAllServices = () => {
	return useQuery(route + routes.services);
};
export const GetServiceById = id => {
	return useQuery(route + routes.services + '/' + id);
};

export const CreateService = () => {
	return useMutation('post', route + routes.services);
};
export const DeleteService = id => {
	return useMutation('delete', `${route + routes.services}/${id}`);
};
// NEWS

export const GetAllNews = () => {
	return useQuery(route + routes.news);
};
export const GetNewsById = id => {
	return useQuery(route + routes.news + '/' + id);
};

export const CreateNews = () => {
	return useMutation('post', route + routes.news);
};
export const DeleteNews = id => {
	return useMutation('delete', `${route + routes.news}/${id}`);
};

// CERTIFICATES

export const GetAllCertificates = () => {
	return useQuery(route + routes.certificates);
};
export const GetCertificateById = id => {
	return useQuery(route + routes.certificates + '/' + id);
};

export const CreateCertificate = () => {
	return useMutation('post', route + routes.certificates);
};
export const DeleteCertificate = id => {
	return useMutation('delete', `${route + routes.certificates}/${id}`);
};

export const PatchCertificate = id => {
	return useMutation('patch', `${route + routes.certificates}/${id}`);
};
