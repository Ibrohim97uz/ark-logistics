import axios from 'axios';

const getToken = () => {
	return window.localStorage.getItem('jwt_access_token');
};

const MainRequest = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		Authorization: `Bearer ${getToken()}`
	}
});

MainRequest.interceptors.response.use(
	config => config,
	error => {
		if (error.response?.status === 401) {
			console.warn(error, '401');
		}
		throw error;
	}
);

export default MainRequest;
