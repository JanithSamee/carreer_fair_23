import axios from "axios";

const base_api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

export default base_api;
