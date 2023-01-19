import axios from "axios"
const apiRoot = axios.create({
  baseURL: `http://192.168.100.225:8082/`
})
export default apiRoot