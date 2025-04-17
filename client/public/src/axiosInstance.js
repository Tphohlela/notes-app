// src/axiosInstance.js
import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_SERVER_URL, 
// });

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:10000', // Fallback to local server
});

export default axiosInstance;
