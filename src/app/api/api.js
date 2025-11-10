// src/api/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001", // Cambia esto por la URL base real
    baseURL: process.env.BACKEND_BASE_URL,
    withCredentials: true,
});

export default api;
