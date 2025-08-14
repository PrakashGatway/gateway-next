import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
    baseURL: "https://portal-backend-tczk.onrender.com/api/v1/",
    timeout: 60000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json"
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Token expired or unauthorized
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                if (typeof window !== "undefined") {
                    window.location.href = "/auth";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
