import axios from "axios";

const axosInstance = axios.create({
    basUrl: "http://localhost:9000"
});

export default axosInstance;