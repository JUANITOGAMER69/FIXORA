import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000", // cambia el puerto si es diferente
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;