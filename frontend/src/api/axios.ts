import axios from "axios";

const baseUrl = typeof window === "undefined" ? "http://localhost:8081" : "";

const instance = axios.create({ baseURL: baseUrl, withCredentials: true });

instance.interceptors.request.use(async (request) => {
	return request;
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { instance };
