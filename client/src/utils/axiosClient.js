import axios from "axios";
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
    setItem,
} from "./localStorageManager";

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
    const accesstoken = getItem(KEY_ACCESS_TOKEN);
    request.headers["Authorization"] = `Bearer ${accesstoken}`;
    return request;
});

axiosClient.interceptors.response.use(async (response) => {
    const data = response.data;
    if (data.status === "ok") {
        return data;
    }
    const originalRequest = response.config;
    const status = data.statusCode;
    const error = data.error;
    if (
        status === 401 &&
        originalRequest.url ===
            `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh/`
    ) {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
    }

    if (status === 401) {
        const response = await axiosClient.get("/auth/refresh/");
        if (response.status === "ok") {
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            originalRequest.headers[
                "Authorization"
            ] = `Bearer ${response.result.accessToken}`;
            return axios(originalRequest);
        }
    }
    return Promise.reject(error);
});
