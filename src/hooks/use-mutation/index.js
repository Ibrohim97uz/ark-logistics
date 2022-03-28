import { useMutation } from 'react-query';
import MainRequest from '../main-request';

// method: "post" | "get" | "put" | "patch" | "delete"
const useGeneralApiMutation = (method, url, options) =>
	useMutation(
		variables => {
			const response = MainRequest({ method, url, data: variables });
			return response;
		},
		{ ...options }
	);

export default useGeneralApiMutation;
