import axios from "axios";

const bookAxios = axios.create({
  baseURL: "http://localhost:4000/book",
  timeout: 3000,
});

const reportAxios = axios.create({
  baseURL: "http://localhost:4000/report",
  timeout: 3000,
});

export { bookAxios, reportAxios };
