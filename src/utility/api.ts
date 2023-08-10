import axios from "axios";

export const apiClient = axios.create({ baseURL: "/api" });

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx
    response?.data,
  (error) =>
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Promise.reject(error)
);
