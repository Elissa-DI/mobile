import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://67ac71475853dfff53dab929.mockapi.io/api/v1",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
// This code sets up an Axios instance with a base URL and default headers.