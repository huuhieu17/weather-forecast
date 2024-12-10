import axios from "axios";
import { appConfig } from "./config";

const api = axios.create({
    baseURL: appConfig.apiUrl,
    params: {
        appId: appConfig.opwmApiKey,
        lang: 'vi',
        units: 'metric'
    }
})

api.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
});

export default api;