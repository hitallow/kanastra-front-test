import axios from "axios";

const app = axios.create({ baseURL: "http://localhost:8081" });

export { app };
