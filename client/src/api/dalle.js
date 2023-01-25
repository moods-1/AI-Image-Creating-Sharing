import axios from 'axios';
import { API_BASE_ROUTE } from '../helpers/constants';

export const generateAiImage = async (body) => {
	const url = `${API_BASE_ROUTE}/api/v1/dalle`;
	return await axios.post(url, body);
};
