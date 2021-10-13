import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 50000,
  headers: {},
});

const postTranslate = (data) => api.post(`/translate`, data);

export { postTranslate };
