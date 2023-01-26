import axios from 'axios';
import { API_BASE_ROUTE } from '../helpers/constants';

export const getAllPosts = async () => {
	const url = `${API_BASE_ROUTE}/api/v1/post`;
	return await axios(url);
};

export const generatePost = async (body) => {
	const url = `${API_BASE_ROUTE}/api/v1/post`;
	return await axios.post(url, body);
};
