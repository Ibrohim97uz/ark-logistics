import { useQuery } from 'react-query';
import MainRequest from '../main-request';

const useGeneralApi = (url, params, options) => {
	return useQuery([url, params], async () => MainRequest.get(url, { params }), { ...options });
};

export default useGeneralApi;
