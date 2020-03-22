import axios from "axios";
import { BASE_API_URL, REQUEST_TIMEOUT } from "../constants";
import {authHeader} from "../../utils/authHeader";

var axiosInstance = axios.create({
    baseURL: BASE_API_URL,
});
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.timeout = REQUEST_TIMEOUT;
// Routing request interception
// http request Interceptor
axiosInstance.interceptors.request.use(config => {
    // Only parse if its Json
    // Determine if there is a token. If it exists, then every HTTP header is added to token.
    const token = authHeader();

    if (token) {
        config.headers["authorization"] = token;
    }

    return config;
});

export default axiosInstance;
