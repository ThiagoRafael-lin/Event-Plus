//Configuração para porta da api, sempre que voce for usar voce passa apenas o recurso(url)
import axios from "axios";

const apiPort = "7118";
const localApi = `https://localhost:${apiPort}/api`;
const externalApi = null;

const api = axios.create({
    baseURL : localApi
});

export default api;