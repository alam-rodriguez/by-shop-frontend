// axios
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL, // Cambia por tu URL base
    // baseURL: "http://192.168.16.63:8081/api", // Cambia por tu URL base
    timeout: 10000, // Tiempo máximo de espera (10s)
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
